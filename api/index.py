from fastapi import FastAPI, Request
from pydantic import BaseModel, EmailStr
import firebase_admin
from firebase_admin import credentials, firestore
from fastapi.middleware.cors import CORSMiddleware
import os
import json



app = FastAPI()

origins = ["http://localhost:5173","https://localhost:5173",
    "https://yourdomain.vercel.app",  # Add your Vercel frontend domain
    "https://indiegpu.com"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)



cred = credentials.Certificate("firebase_cred.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def initialize_firebase():
    if os.environ.get("VERCEL"):
        firebase_credentials= os.environ.get("FIREBASE_CREDENTIALS")
        if firebase_credentials:
            cred_dict = json.loads(firebase_credentials)
            cred = credentials.Certificate(cred_dict)
        else:
            raise ValueError("FIREBASE_CREDENTIALS environment variable is not set")
    else:
        cred = credentials.Certificate("firebase_cred.json")
    
    try:
        firebase_admin.initialize_app(cred)
    except ValueError:
        pass

    return firestore.client()
db = initialize_firebase()


class LeadsData(BaseModel):
    email:EmailStr
    first_name:str
    last_name:str
    country:str
    phone_number:str



@app.post('/join-waitlist')
async def submit_email(leads:LeadsData):
    try:
        doc_ref = db.collection("leads").document(leads.email)
        doc = doc_ref.get() 
        if doc.exists:
            return{
                "status":"user already in the list",
                "message":"You are already in the list."
            }


        print(f"Received request with data: {leads}")
        db.collection('leads').document(leads.email).set({
            "email":leads.email,
            "first_name":leads.first_name,
            "last_name":leads.last_name,
            "country":leads.country,
            "phone_number":leads.phone_number,
            "time":firestore.SERVER_TIMESTAMP
        })
        return{
            "status":"success",
            "message":"Thank you for submission."
        }
    except Exception as e:
        return{
            "status":"error",
            "message":f"failed to putup email {str(e)}"
        }
@app.get("/")
async def root():
    return {"message": "Welcome to the Email API!"}
