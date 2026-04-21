from sqlalchemy.orm import Session
from app.database.models.sponsor import Sponsor, SponsorTier
import os

def create_sponsor(db: Session, sponser_data):
    sponsor = Sponsor(**sponser_data.model_dump())

    db.add(sponsor)
    db.commit()
    db.refresh(sponsor)

    return sponsor

def create_tier(db: Session, tier_data):
    tier = SponsorTier(**tier_data.model_dump())

    db.add(tier)
    db.commit()
    db.refresh(tier)

    return tier

def get_sponsor_data(db: Session):
    tierData = db.query(SponsorTier).all()

    sponsorData = db.query(Sponsor).all()


    return {"sponsor": sponsorData,
            "tier": tierData}

def del_sponsor(db: Session, sponsor_id):
    sponsor = db.query(Sponsor).filter(Sponsor.id == sponsor_id).first()

    if sponsor:
        db.delete(sponsor)
        db.commit()

    return sponsor

def del_sponsor_tier(db: Session, tier_id):
    sponsorTier = db.query(SponsorTier).filter(SponsorTier.id == tier_id).first()

    if sponsorTier:
        db.delete(sponsorTier)
        db.commit()

    return sponsorTier



if __name__ == "__main__":
    pass



