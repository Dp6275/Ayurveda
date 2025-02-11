from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, Date, Text, TIMESTAMP, func
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from pydantic import BaseModel
import bcrypt

# ✅ FastAPI App Setup
app = FastAPI()

# ✅ Database Configuration
DATABASE_URL = "mysql+mysqlconnector://root:2005@localhost/vit"

# SQLAlchemy Setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ✅ User Model (SQLAlchemy)
class User(Base):
    _tablename_ = "users"

    user_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    date_of_birth = Column(Date, nullable=True)
    health_conditions = Column(Text, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp(), nullable=True)

# ✅ Function to Hash Password
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode(), salt)
    return hashed.decode()

# ✅ Function to Create a New User
def create_user(db_session: Session, name: str, email: str, date_of_birth: str = None, health_conditions: str = None):
    db_user = User(name=name, email=email, date_of_birth=date_of_birth, health_conditions=health_conditions)
    db_session.add(db_user)
    db_session.commit()
    db_session.refresh(db_user)
    return db_user

# ✅ Pydantic Model for User Registration
class UserCreate(BaseModel):
    name: str
    email: str
    date_of_birth: str = None
    health_conditions: str = None

# ✅ Dependency to Get DB Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Endpoint to Register a User
@app.post("/register")
async def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_user = create_user(db, name=user.name, email=user.email, date_of_birth=user.date_of_birth, health_conditions=user.health_conditions)
    return {
        "message": "User registered successfully!",
        "user_id": db_user.user_id,
        "name": db_user.name,
        "email": db_user.email,
        "date_of_birth": db_user.date_of_birth,
        "health_conditions": db_user.health_conditions
    }