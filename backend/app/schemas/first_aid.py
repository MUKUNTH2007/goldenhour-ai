from pydantic import BaseModel


class FirstAidRequest(BaseModel):
    description: str