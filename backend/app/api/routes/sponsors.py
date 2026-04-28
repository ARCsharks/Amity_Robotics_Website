from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.database.schemas.sponsor import (
    SponsorAndTierResponse,
    SponsorCreate,
    SponsorResponse,
    SponsorTierCreate,
    SponsorTierResponse,
)
from app.services.sponsor_service import (
    create_sponsor as create_sponsor_record,
    create_tier,
    get_sponsor_data,
    del_sponsor,
    del_sponsor_tier
)

router = APIRouter()

@router.post("/create-tier", response_model=SponsorTierResponse)
def create_sponsor_tier(sponsor_tier: SponsorTierCreate, db: Session = Depends(get_db)):
    return create_tier(db, sponsor_tier)

@router.post("/create-sponsor", response_model=SponsorResponse)
def create_sponsor(sponsor: SponsorCreate, db: Session = Depends(get_db)):
    return create_sponsor_record(db, sponsor)

@router.get("", response_model=SponsorAndTierResponse)
def return_sponsor_data(db: Session = Depends(get_db)):
    return get_sponsor_data(db)

@router.delete("/sponsor/{sponsor_id}", response_model=SponsorResponse)
def delete_spons(sponsor_id: int, db: Session = Depends(get_db)):
    return del_sponsor(db, sponsor_id)

@router.delete("/tier/{tier_id}", response_model=SponsorTierResponse)
def delete_tier(tier_id: int, db: Session = Depends(get_db)):
    return del_sponsor_tier(db, tier_id)