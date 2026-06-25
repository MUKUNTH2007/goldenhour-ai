from fastapi import APIRouter
import json

router = APIRouter()


@router.get("/hospitals")
def get_hospitals():

    with open("app/data/hospitals.json", "r") as file:
        hospitals = json.load(file)

    return hospitals