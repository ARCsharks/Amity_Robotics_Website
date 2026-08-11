from fastapi import APIRouter


from app.services.post_service import get_youtube_videos
from app.database.schemas.post import YoutubeVideo


router = APIRouter()

@router.get("/youtube", response_model=list[YoutubeVideo])
def Get_Youtube_videos():
    return get_youtube_videos()


