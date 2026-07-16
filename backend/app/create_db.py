from app.database import Base, engine
from app.models.user import User
from app.models.review import Review

Base.metadata.create_all(bind=engine)

print("Database Created Successfully")
