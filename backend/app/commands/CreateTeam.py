import os
import sys
from pathlib import Path

# ensure backend root is on sys.path to resolve app folder imports when run directly
base = Path(__file__).resolve().parents[2] 
sys.path.insert(0, str(base))

from app.services.team_service import create_team
from app.api import deps
from app.database.database import SessionLocal
from app.database.schemas.team import TeamCreate
from app.services.image_service import image_to_data

if __name__ == "__main__":
    print("Creating a team profile! \n")

    nm = input("Name (Include team number, name and competition season [if possible]): ")
    com = input("Competition (Don't include season or year. Try to use abreveation): ")
    yr = input("Year: ")
    des = input("Description: ")
    img = input("Image Path: ")

    team = TeamCreate(
        name=nm,
        comp=com,
        year=yr,
        description=des,
        image_data=image_to_data(img)
    )

    db = SessionLocal()

    try:
        create_team(db=db, team_data=team)
        print("Team created successfully")
    finally:
        db.close()
