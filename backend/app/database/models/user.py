from sqlalchemy import Column, Integer, String, ClauseList
from app.database.database import Base

class VerificationCode(Base):
    __tablename__ = "verification_codes"

    email = Column(String, primary_key=True)
    code_hash = Column(String, nullable=False)
    salt = Column(String, nullable=False)
    expires_at = Column(Integer, nullable=False)
    attempts = Column(Integer, default=0)
    verified = Column(Integer, default=0)