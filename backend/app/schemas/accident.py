from pydantic import BaseModel


class AccidentCreate(BaseModel):
    name: str
    location: str
    description: str