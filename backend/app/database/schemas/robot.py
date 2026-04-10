from pydantic import BaseModel

class RobotCreate(BaseModel):
    name: str
    year: int
    description: str
    image_data: str

class RobotResponse(RobotCreate):
    id: int

    class Config:
        from_attributes = True