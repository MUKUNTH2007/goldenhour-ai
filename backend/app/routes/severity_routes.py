from fastapi import APIRouter
from app.schemas.severity import SeverityRequest

router = APIRouter()


@router.post("/severity")
def predict_severity(data: SeverityRequest):

    severity = "Low"

    if data.injured_count >= 3:
        severity = "High"

    if "unconscious" in data.description.lower():
        severity = "High"

    return {
        "severity": severity
    }