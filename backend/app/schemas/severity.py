from pydantic import BaseModel

class SeverityRequest(BaseModel):
    vehicle_type: str
    injured_count: int
    description: str