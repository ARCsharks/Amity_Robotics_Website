from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.database.schemas.robot import RobotCreate, RobotResponse
from app.services.robot_service import create_robot, get_robots, del_robot
from app.core.security import verify_api_key

router = APIRouter()

@router.post("", response_model=RobotResponse)
def create(robot: RobotCreate, db: Session = Depends(get_db), _: str = Depends(verify_api_key)):
    return create_robot(db, robot)

@router.get("", response_model=list[RobotResponse])
def read(db: Session = Depends(get_db)):
    return get_robots(db)

@router.delete("/{robot_id}", response_model=RobotResponse)
def delete(robot_id: int, db: Session = Depends(get_db), _: str = Depends(verify_api_key)):
    return del_robot(db, robot_id)