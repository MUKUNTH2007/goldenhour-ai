from sqlalchemy import Column, BigInteger, String, DateTime
from sqlalchemy.sql import func

from app.models.base import Base


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(BigInteger, primary_key=True, index=True)
    accident_id = Column(BigInteger)
    hospital_id = Column(BigInteger)
    status = Column(String(50))
    sent_at = Column(DateTime(timezone=True), server_default=func.now())