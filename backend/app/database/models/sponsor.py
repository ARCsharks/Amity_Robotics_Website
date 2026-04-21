from sqlalchemy import Column, Integer, String, Text, LargeBinary, JSON
from app.database.database import Base

class Sponsor(Base):
    __tablename__ = "sponsors"

    id = Column(Integer, primary_key=True, index=True)
    tier = Column(String(255), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    website = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    logo_data = Column(Text, nullable=True)
    socials = Column(JSON, nullable=True)

class SponsorTier(Base):
    __tablename__ = "sponsor_tiers"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(255), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    fields = Column(JSON, nullable=False)