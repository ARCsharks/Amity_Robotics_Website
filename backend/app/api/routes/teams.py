from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.database.schemas.team import TeamCreate, TeamResponse
from app.services.team_service import create_team, del_team, get_teams, del_team

router = APIRouter()

@router.post("", response_model=TeamResponse)
def create(team: TeamCreate, db: Session = Depends(get_db)):
    return create_team(db, team)

@router.get("", response_model=list[TeamResponse])
def read(db: Session = Depends(get_db)):
    return get_teams(db)

@router.delete("/{team_id}", response_model=TeamResponse)
def delete(team_id: int, db: Session = Depends(get_db)):
    del_team(db, team_id)