import os
import sys
from pathlib import Path

# ensure backend root is on sys.path to resolve appp package imports when run directly
base = Path(__file__).resolve().parents[2] 
sys.path.insert(0, str(base))

from app.services.robot_service import create_robot
from app.api import deps
from app.database.database import SessionLocal
from app.database.schemas.robot import RobotCreate
from app.services.image_service import image_to_data

if __name__ == "__main__":
    print("Creating a robot profile! \n")

    nm = input("Name: ")
    yr = input("Year: ")
    des = input("Description: ")
    img = input("Image Path: ")

    robot = RobotCreate(
        name=nm,
        year=yr,
        description=des,
        image_data=image_to_data(img)
    )

    db = SessionLocal()
    try:
        create_robot(db=db, robot_data=robot)
        print("Robot created successfully")
    finally:
        db.close()
