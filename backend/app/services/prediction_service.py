from app.models.prediction import Prediction


def create_prediction(
    db,
    accident_id: int,
    severity: str,
    score: float
):

    prediction = Prediction(
        accident_id=accident_id,
        predicted_severity=severity,
        confidence_score=score
    )

    db.add(prediction)
    db.commit()
    db.refresh(prediction)

    return prediction