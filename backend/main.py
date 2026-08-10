from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_postgres import PGVector
import os

app = FastAPI()

# Database Setup
DB_URL = "postgresql+psycopg://snaps_admin:securepassword@localhost:5432/snaps_rag"
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/text-embedding-004", 
    google_api_key=os.getenv("GEMINI_API_KEY")
)

vector_store = PGVector(
    connection=DB_URL,
    embeddings=embeddings,
    collection_name="sharepoint_docs",
    use_jsonb=True
)

retriever = vector_store.as_retriever(search_kwargs={"k": 4})

# LLM Setup
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=os.getenv("GEMINI_API_KEY"))

# System Prompt Template
system_prompt = (
    "You are an expert technical AI assistant for SNAPS Engineering.\n"
    "Use the following pieces of retrieved SharePoint document context to answer "
    "the question. If you do not know the answer, say 'I cannot find that in the official manuals.'\n\n"
    "{context}"
)

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
])

question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

class QueryRequest(BaseModel):
    question: str

@app.post("/api/rag/ask")
async def ask_rag(request: QueryRequest):
    try:
        response = rag_chain.invoke({"input": request.question})
        return {
            "answer": response["answer"],
            "sources": [doc.metadata.get("source", "Unknown") for doc in response["context"]]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))