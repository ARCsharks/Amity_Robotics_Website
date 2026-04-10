from sqlalchemy.orm import Session
from app.database.models.robot import Robot

def create_robot(db: Session, robot_data):
    robot = Robot(**robot_data.dict())
    db.add(robot)
    db.commit()
    db.refresh(robot)
    return robot

def get_robots(db: Session):
    return db.query(Robot).all()
