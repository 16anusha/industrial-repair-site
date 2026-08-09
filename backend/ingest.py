import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_sqlserver.vectorstores import SQLServer_VectorStore
from langchain_core.documents import Document

load_dotenv()

REAL_GEMINI_KEY = os.getenv("GEMINI_API_KEY")

texts = [
    "Hydraulic press maintenance: Check oil levels weekly and replace filters every 6 months.",
    "Conveyor belt emergency stop: If the belt jams, hit the red master stop switch immediately and notify the shift supervisor.",
    "Welder calibration: Calibrate voltage outputs monthly using a standard multimeter test."
]

# FIX: Added output_dimensionality to shrink the vector to 768
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001",
    google_api_key=REAL_GEMINI_KEY,
    output_dimensionality=768
)

vector_store = SQLServer_VectorStore(
    connection_string=os.environ["AZURE_SQL_CONNECTION_STRING"],
    table_name="book_chunks",
    embedding_function=embeddings,
    embedding_length=768
)

docs = [Document(page_content=t) for t in texts]
vector_store.add_documents(docs)
print("Successfully ingested documents into Azure SQL vector store!")