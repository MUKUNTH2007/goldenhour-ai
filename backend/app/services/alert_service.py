from app.models.alert import Alert


def create_alert(
    db,
    accident_id: int,
    hospital_id: int
):

    alert = Alert(
        accident_id=accident_id,
        hospital_id=hospital_id,
        status="SENT"
    )

    db.add(alert)
    db.commit()
    db.refresh(alert)

    return alert