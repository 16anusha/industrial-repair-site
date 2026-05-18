from sqlalchemy import Column, Integer, String, Boolean, Text
from database import Base

# 1. The Admin Table (Suren's Account)
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_superadmin = Column(Boolean, default=True)

# 2. The 24/7 Emergency Dispatch Table
class EmergencyTicket(Base):
    __tablename__ = "emergency_tickets"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, index=True)
    facility_location = Column(String)
    system_type = Column(String) # e.g., PLC, Rectifier, CAD/CAM
    severity = Column(String) # Low, Medium, CRITICAL
    description = Column(Text)
    status = Column(String, default="Pending") # Pending, Dispatched, Resolved

# 3. The Case Studies & Portfolio Table
class Reference(Base):
    __tablename__ = "references"

    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String, index=True)
    tasks = Column(Text) # We will store the bullet points here