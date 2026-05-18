import jwt
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext

# In a real enterprise app, this lives in a hidden .env file!
SECRET_KEY = "snaps-engineering-super-secret-vault-key"
ALGORITHM = "HS256"

# This sets up our password hasher
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    # The wristband expires in 24 hours
    expire = datetime.now(timezone.utc) + timedelta(hours=24)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt