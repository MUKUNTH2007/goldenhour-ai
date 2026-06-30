from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database import get_db
from app.models.hospital import Hospital
from app.services.recommendation_service import get_recommended_hospitals

router = APIRouter()


# -----------------------------
# Request Schema (GLOBAL)
# -----------------------------
class AccidentLocation(BaseModel):
    latitude: float
    longitude: float


# -----------------------------
# GET ALL HOSPITALS (RAW DATA)
# -----------------------------
@router.get("/hospitals")
def get_hospitals(db: Session = Depends(get_db)):

    hospitals = db.query(Hospital).all()

    result = []

    for hospital in hospitals:
        result.append({
            "id": hospital.id,
            "name": hospital.name,
            "address": hospital.address,
            "phone": hospital.phone,
            "available_beds": hospital.available_beds,
            "emergency_available": hospital.emergency_available,
            "latitude": float(hospital.latitude),
            "longitude": float(hospital.longitude)
        })

    return result


# -----------------------------
# RECOMMENDATION ENGINE API
# -----------------------------
@router.post("/hospitals/recommend")
def recommend_hospitals(
    location: AccidentLocation,
    db: Session = Depends(get_db)
):

    results = get_recommended_hospitals(
        db=db,
        accident_lat=location.latitude,
        accident_lon=location.longitude
    )

    return {
        "success": True,
        "total_hospitals": len(results),
        "data": results
    }