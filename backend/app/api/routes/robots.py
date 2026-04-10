from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.database.schemas.robot import RobotCreate, RobotResponse
from app.services.robot_service import create_robot, get_robots

router = APIRouter()

@router.post("", response_model=RobotResponse)
def create(robot: RobotCreate, db: Session = Depends(get_db)):
    return create_robot(db, robot)

@router.get("", response_model=list[RobotResponse])
def read(db: Session = Depends(get_db)):
    return get_robots(db)