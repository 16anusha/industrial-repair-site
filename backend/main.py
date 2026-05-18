from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import jwt

import models
import auth
from database import engine, SessionLocal

# Build the database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()
security = HTTPBearer()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DATABASE CONNECTION PIPELINE ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- THE SECURITY PADLOCK ---
def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired. Please log in again.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid authorization token.")

# --- INITIALIZE THE OWNER ACCOUNT ---
@app.on_event("startup")
def create_initial_admin():
    db = SessionLocal()
    admin = db.query(models.User).filter(models.User.email == "suren@snapsengineering.com.au").first()
    if not admin:
        hashed_pw = auth.get_password_hash("Admin123!") # Default password
        new_admin = models.User(email="suren@snapsengineering.com.au", hashed_password=hashed_pw, is_superadmin=True)
        db.add(new_admin)
        db.commit()
    db.close()
    
# --- PYDANTIC SCHEMA (The Security Guard) ---
class TicketCreate(BaseModel):
    company_name: str
    facility_location: str
    system_type: str
    severity: str
    description: str

class LoginRequest(BaseModel):
    email: str
    password: str
# --- API ENDPOINTS ---
#1. Login Route (Trades email/password for a JWT Wristband)
@app.post("/api/login")
def login_user(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    
    if not user or not auth.verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    # Give them the wristband
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# 2. The Emergency Dispatch Route (Writes to Database)
@app.post("/api/emergency")
def create_emergency_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):
    # Package the secure data into a Database Model
    db_ticket = models.EmergencyTicket(
        company_name=ticket.company_name,
        facility_location=ticket.facility_location,
        system_type=ticket.system_type,
        severity=ticket.severity,
        description=ticket.description,
        status="Pending"
    )
    # Save it to the vault
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    
    return {
        "message": "Emergency ticket submitted successfully.", 
        "ticket_id": db_ticket.id
    }

# 3. The Corporate Capabilities Route (Reads static data)
@app.get("/api/services")
def get_services_data():
    return {
        "company": {
            "name": "SNAPS Engineering PTY LTD",
            "director": "Suren Goonawardane",
            "address": "59, Clovelly Circuit, Truganina Vic 3029",
            "phone": "+61 4 2626 4300",
            "email": "suren@snapsengineering.com.au",
            "web": "snapsengineering.com"
        },
        "headline": "Industrial Electrical & Electronic Repair Services",
        "description": "We undertake repairs on electrical and electronic-based plants and machinery. With extensive industry knowledge and hands-on experience, we provide reliable repair, upgrade, and modification services for a wide range of industrial systems and equipment.",
        "emergency_support": "We also provide 24 x 7 breakdown and emergency support services to minimise operational downtime and ensure continuity of operations.",
        "expertise": [
            "CAD/CAM machinery used in industrial applications",
            "Rectifiers used in aluminium anodizing plants",
            "Food processing equipment (e.g. cooking chambers)",
            "PLC-based control panels",
            "Water bottling plants",
            "Injection moulding machines",
            "Spark erosion machines",
            "UPS systems",
            "Industrial rectifiers",
            "Power supplies"
        ],
        "references": [
            {"client": "Mildura Airport, Victoria", "tasks": ["Investigated and rectified a generator starting issue by designing and installing a monitoring and control circuit to the ATS panel.", "Investigated malfunctions in the car park gate system."]},
            {"client": "Bundaberg Airport, Australia", "tasks": ["Investigated damage to electrical and electronic systems caused by lightning events. Submitted comprehensive technical report."]},
            {"client": "Coffs Harbour Airport", "tasks": ["Provided after-sales technical support and maintenance services as the local agent for CONRAC, Germany."]},
            {"client": "PGH Bricks & Pavers Pty Ltd", "tasks": ["Designed and built an electronic circuit for remote gas meter monitoring."]}
        ]
    }
# 4. Admin Route: Get all emergency tickets
@app.get("/api/admin/tickets")
def get_all_tickets(db: Session = Depends(get_db)):
    # Query the database and order by newest first
    tickets = db.query(models.EmergencyTicket).order_by(models.EmergencyTicket.id.desc()).all()
    return tickets