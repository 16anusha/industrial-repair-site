from fastapi import FastAPI
from pydantic import BaseModel
import os
from langchain_postgres import PGVector
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai

app = FastAPI()

# 1. Setup your API Keys
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)
DB_URL = "postgresql+psycopg://snaps_admin:securepassword@localhost:5432/snaps_rag"

# 2. Connect to your pgvector Filing Cabinet
embeddings = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004")
vector_store = PGVector(
    connection=DB_URL,
    embeddings=embeddings,
    collection_name="sharepoint_docs"
)

# 3. Define the data we expect from the frontend
class ChatRequest(BaseModel):
    user_message: str

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    # A. Convert the user's question to a vector and search the database!
    # (This pulls the top 3 most relevant paragraphs from Suren's books)
    matching_docs = vector_store.similarity_search(request.user_message, k=3)
    
    # B. Combine those paragraphs into a single string of text
    context_text = "\n\n".join([doc.page_content for doc in matching_docs])
    
    # C. Create the "Grounded" Prompt for Gemini
    strict_prompt = f"""
    You are an expert engineering assistant for SNAPS Engineering.
    You MUST answer the user's question using ONLY the context provided below. 
    If the answer is not in the context, say "I cannot find this in our technical library. Please contact Suren."
    
    CONTEXT (From our technical manuals):
    {context_text}
    
    USER QUESTION:
    {request.user_message}
    """
    
    # D. Send to Gemini and return the answer to Next.js
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(strict_prompt)
    
    return {"reply": response.text}