from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.hospital_routes import router as hospital_router
from app.routes.accident_routes import router as accident_router
from app.routes.severity_routes import router as severity_router
from app.routes.first_aid_routes import router as first_aid_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(hospital_router)
app.include_router(accident_router)
app.include_router(severity_router)
app.include_router(first_aid_router)

@app.get("/")
def home():
    return {
        "project": "GoldenHour AI",
        "status": "Backend Running"
    }

@app.get("/health")
def health():
    return {
        "success": True,
        "message": "Server is healthy"
    }