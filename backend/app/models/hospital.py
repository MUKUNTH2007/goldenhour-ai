from sqlalchemy import (
    Column,
    BigInteger,
    String,
    Text,
    Integer,
    Boolean,
    DECIMAL,
    DateTime
)
from sqlalchemy.sql import func

from app.models.base import Base


class Hospital(Base):
    __tablename__ = "hospitals"

    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    address = Column(Text)
    phone = Column(String(20))
    available_beds = Column(Integer, default=0)
    emergency_available = Column(Boolean, default=True)
    latitude = Column(DECIMAL(10, 8))
    longitude = Column(DECIMAL(11, 8))
    created_at = Column(DateTime(timezone=True), server_default=func.now())