from fastapi import APIRouter, HTTPException

from app.schemas.first_aid import FirstAidRequest
from app.services.first_aid_service import FirstAidService

router = APIRouter()

first_aid_service = FirstAidService()


@router.post("/first-aid")
def get_first_aid(data: FirstAidRequest):
    try:
        answer = first_aid_service.get_first_aid(
            description=data.description,
            language=data.language,
        )

        return {
            "answer": answer
        }

    except Exception:
     fallback = first_aid_service.get_fallback_advice(
        data.description
    )

    return {
        "answer": fallback,
        "source": "fallback"
    
    
    }