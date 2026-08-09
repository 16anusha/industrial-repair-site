import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_sqlserver.vectorstores import SQLServer_VectorStore
from fastapi.middleware.cors import CORSMiddleware
# FIX: Updated these two imports to use langchain_classic!
from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import create_stuff_documents_chain

from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

REAL_GEMINI_KEY = os.getenv("GEMINI_API_KEY")
app = FastAPI()
# Allow your frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all websites to connect (you can restrict this later!)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# 1. Initialize Gemini Embeddings and LLM
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001",
    google_api_key=REAL_GEMINI_KEY,
    output_dimensionality=768
)

llm = ChatGoogleGenerativeAI(
    model="gemini-3.6-flash",
    temperature=0.3,
    google_api_key=REAL_GEMINI_KEY
)

# 2. Connect to your Azure SQL Vector Store
vector_store = SQLServer_VectorStore(
    connection_string=os.environ["AZURE_SQL_CONNECTION_STRING"],
    table_name="book_chunks",
    embedding_function=embeddings,
    embedding_length=768
)

# Create a retriever from the vector store
retriever = vector_store.as_retriever(search_kwargs={"k": 3})

# 3. Setup the RAG Prompt and Chains
system_prompt = (
    "You are an expert AI assistant for an industrial repair site. "
    "Use the following pieces of retrieved context to answer "
    "the user's question. If you don't know the answer, say that you "
    "don't know.\n\n"
    "{context}"
)

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
])

question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        # Run the RAG chain using the user's message as input
        response = rag_chain.invoke({"input": request.message})
        return {
            "query": request.message,
            "answer": response["answer"],
            "source_documents": [doc.page_content for doc in response.get("context", [])]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))