from pydantic import BaseModel, Field
from typing import Literal


class FirstAidRequest(BaseModel):
    description: str = Field(
        ...,
        min_length=5,
        max_length=1000,
        description="Describe the emergency situation."
    )

    language: Literal["English", "Tamil", "Hindi"] = "English"