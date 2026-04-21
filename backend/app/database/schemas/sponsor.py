from pydantic import BaseModel
from typing import List, Optional

class SponsorTierCreate(BaseModel):
    key: str
    name: str
    fields: List[str]

class SocialCreate(BaseModel):
    socialType: str
    socialLink: str

class SponsorCreate(BaseModel):
    name: str
    logo_data: str
    website: str
    tier: str
    socials: Optional[List[SocialCreate]] = None
    description: Optional[str] = None

class SponsorTierResponse(SponsorTierCreate):
    id: int

    class Config:
        from_attributes = True

class SponsorResponse(SponsorCreate):
    id: int

    class Config:
        from_attributes = True

class SponsorAndTierResponse(BaseModel):
    sponsor: List[SponsorResponse]
    tier: List[SponsorTierResponse]

    class Config:
        from_attributes = True