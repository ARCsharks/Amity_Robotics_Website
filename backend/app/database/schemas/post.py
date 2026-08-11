from pydantic import BaseModel
from typing import Optional

class YoutubeVideo(BaseModel):
    title: str
    description: Optional[str] = None
    published: str
    thumbnail_data: str
    url: str

        


