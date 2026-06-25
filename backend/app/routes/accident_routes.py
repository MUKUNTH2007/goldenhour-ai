from fastapi import APIRouter
from app.schemas.accident import AccidentCreate
import json

router = APIRouter()


@router.post("/accidents")
def create_accident(accident: AccidentCreate):

    with open("app/data/accidents.json", "r") as file:
        accidents = json.load(file)

    accidents.append(accident.dict())

    with open("app/data/accidents.json", "w") as file:
        json.dump(accidents, file, indent=4)

    return {
        "success": True,
        "message": "Accident reported successfully"
    }


@router.get("/accidents")
def get_accidents():

    with open("app/data/accidents.json", "r") as file:
        accidents = json.load(file)

    return accidents