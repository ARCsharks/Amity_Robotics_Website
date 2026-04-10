from sqlalchemy import Column, Integer, String, Text, LargeBinary
from app.database.database import Base

class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    comp = Column(String)
    year = Column(Integer)
    description = Column(Text)
    image_data = Column(String)