from pydantic import BaseModel

class TeamCreate(BaseModel):
    name: str
    comp: str
    year: int
    description: str
    image_data: str

class TeamResponse(TeamCreate):
    id: int

    class Config:
        from_attributes = True