from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.accident import AccidentCreate
from app.models.accident import Accident

from app.services.severity_service import predict_severity
from app.services.prediction_service import create_prediction
from app.services.alert_service import create_alert 

router = APIRouter()


@router.post("/accidents")
def create_accident(
    data: AccidentCreate,
    db: Session = Depends(get_db)
):

    print("[INFO] Creating accident report")

    accident = Accident(
        victim_name=data.name,
        location=data.location,
        injury_description=data.description,
        severity="Pending"
    )

    db.add(accident)
    db.commit()
    db.refresh(accident)

    print(f"[INFO] Accident saved: {accident.id}")

    prediction_result = predict_severity(
        accident.injury_description
    )

    print(
        f"[INFO] Severity predicted: "
        f"{prediction_result['severity']}"
    )

    prediction = create_prediction(
        db=db,
        accident_id=accident.id,
        severity=prediction_result["severity"],
        score=prediction_result["score"]
    )

    accident.severity = prediction_result["severity"]
    db.commit()

    alert_created = False

    if prediction_result["severity"] in [
        "HIGH",
        "CRITICAL"
    ]:

        create_alert(
            db=db,
            accident_id=accident.id,
            hospital_id=1
        )

        alert_created = True

        print(
            "[WARNING] Emergency alert generated"
        )

    return {
        "success": True,
        "accident_id": accident.id,
        "severity": prediction.predicted_severity,
        "score": prediction.confidence_score,
        "alert_created": alert_created,
        "message": "Accident processed successfully"
    }