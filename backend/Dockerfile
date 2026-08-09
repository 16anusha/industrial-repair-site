# Use a lightweight Linux/Python base
FROM python:3.11-slim

# Install system dependencies required for downloading
RUN apt-get update && apt-get install -y curl gnupg unixodbc-dev

# Download and install the Microsoft ODBC Driver 18 for Linux
RUN curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /usr/share/keyrings/microsoft-prod.gpg \
    && curl -fsSL https://packages.microsoft.com/config/debian/12/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y msodbcsql18

# Set up your Python application folder
WORKDIR /app

# Copy requirements and install Python packages
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy all your backend Python files into the container
COPY . .

# Start the FastAPI server just like before
CMD ["uvicorn", "chat_api:app", "--host", "0.0.0.0", "--port", "10000"]