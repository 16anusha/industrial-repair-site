import os
import requests
from langchain_community.document_loaders import SharePointLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_postgres import PGVector

# 1. Credentials
AZURE_CLIENT_ID = os.getenv("AZURE_CLIENT_ID")
AZURE_CLIENT_SECRET = os.getenv("AZURE_CLIENT_SECRET")
AZURE_TENANT_ID = os.getenv("AZURE_TENANT_ID")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

DB_URL = "postgresql+psycopg://snaps_admin:securepassword@localhost:5432/snaps_rag"

# 2. Embedding Model
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/text-embedding-004", 
    google_api_key=GEMINI_API_KEY
)

def sync_sharepoint_to_pgvector(document_library_id: str):
    print("Fetching documents from SharePoint...")
    
    # Load files from SharePoint library
    loader = SharePointLoader(
        document_library_id=document_library_id,
        client_id=AZURE_CLIENT_ID,
        client_secret=AZURE_CLIENT_SECRET,
        tenant_id=AZURE_TENANT_ID
    )
    docs = loader.load()

    # Split documents into optimal chunks for RAG
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
    chunked_docs = text_splitter.split_documents(docs)

    # Store/Update in Postgres pgvector
    vector_store = PGVector(
        connection=DB_URL,
        embeddings=embeddings,
        collection_name="sharepoint_docs",
        use_jsonb=True
    )
    
    vector_store.add_documents(chunked_docs)
    print(f"Successfully processed and stored {len(chunked_docs)} chunks into pgvector!")

if __name__ == "__main__":
    # Run the initial manual sync
    sync_sharepoint_to_pgvector(document_library_id="YOUR_SHAREPOINT_LIBRARY_ID")