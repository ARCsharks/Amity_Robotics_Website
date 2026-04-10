from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.database.schemas.team import TeamCreate, TeamResponse
from app.services.team_service import create_team, get_teams

router = APIRouter()

@router.post("", response_model=TeamResponse)
def create(team: TeamCreate, db: Session = Depends(get_db)):
    return create_team(db, team)

@router.get("", response_model=list[TeamResponse])
def read(db: Session = Depends(get_db)):
    return get_teams(db)