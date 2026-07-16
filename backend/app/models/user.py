from sqlalchemy import Column, Integer, String
from app.database import Base

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    github_id = Column(Integer, unique=True)

    username = Column(String)

    name = Column(String)

    email = Column(String)

    avatar = Column(String)