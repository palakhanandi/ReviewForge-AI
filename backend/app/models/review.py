from sqlalchemy import Column, Integer, Text, String, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)

    owner = Column(String)
    repo = Column(String)
    pull_number = Column(Integer)

    review = Column(Text)

    created_at = Column(DateTime(timezone=True), server_default=func.now())