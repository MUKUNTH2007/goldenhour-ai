from fastapi import APIRouter
from app.schemas.first_aid import FirstAidRequest

router = APIRouter()


@router.post("/first-aid")
def get_first_aid(data: FirstAidRequest):

    description = data.description.lower()

    advice = [
        "Call emergency services immediately."
    ]

    if "unconscious" in description:
        advice.append(
            "Check breathing and place victim in recovery position."
        )

    if "bleeding" in description:
        advice.append(
            "Apply direct pressure to the wound."
        )

    if "fracture" in description:
        advice.append(
            "Immobilize the injured limb."
        )

    return {
        "advice": advice
    }