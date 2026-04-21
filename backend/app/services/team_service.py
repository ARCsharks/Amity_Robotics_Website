from sqlalchemy.orm import Session
from app.database.models.team import Team

def create_team(db: Session, team_data):
    team = Team(**team_data.dict())
    db.add(team)
    db.commit()
    db.refresh(team)
    return team

def get_teams(db: Session):
    return db.query(Team).all()

def del_team(db: Session, team_id: int):
    team = db.query(Team).filter(Team.id == team_id).first()

    if team:
        db.delete(team)
        db.commit()

    return team