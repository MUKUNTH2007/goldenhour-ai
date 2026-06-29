from sqlalchemy import Column, BigInteger, String, Float, DateTime
from sqlalchemy.sql import func

from app.models.base import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(BigInteger, primary_key=True, index=True)
    accident_id = Column(BigInteger)
    predicted_severity = Column(String(50))
    confidence_score = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())