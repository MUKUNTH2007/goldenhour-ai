from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.accident import AccidentCreate
from app.models.accident import Accident

router = APIRouter()


@router.post("/accidents")
def create_accident(
    data: AccidentCreate,
    db: Session = Depends(get_db)
):

    accident = Accident(
        victim_name=data.name,
        location=data.location,
        injury_description=data.description,
        severity="Pending"
    )

    db.add(accident)
    db.commit()
    db.refresh(accident)

    return {
        "success": True,
        "accident_id": accident.id,
        "message": "Accident report saved"
    }