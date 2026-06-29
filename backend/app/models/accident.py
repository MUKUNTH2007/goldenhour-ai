from sqlalchemy import Column, BigInteger, String, Text, DateTime
from sqlalchemy.sql import func

from app.models.base import Base


class Accident(Base):
    __tablename__ = "accidents"

    id = Column(BigInteger, primary_key=True, index=True)
    victim_name = Column(String(100))
    location = Column(Text)
    injury_description = Column(Text)
    severity = Column(String(50))
    reported_at = Column(DateTime(timezone=True), server_default=func.now())