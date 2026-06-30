from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.hospital import Hospital

router = APIRouter()


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