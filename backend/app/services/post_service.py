import requests
import pprint

from app.database.schemas.post import YoutubeVideo

apiKey = "AIzaSyDeZ433m1C3FzqDEy5Cy6VWwVi9VxtSTy4"
arcSharksVideoPlaylist = "UUYGpmN5cg1fXwSsiaJHEGuw"

playlistFetchLink = f"https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={arcSharksVideoPlaylist}&maxResults=5&key={apiKey}"

def get_youtube_videos():
    result = requests.get(playlistFetchLink)

    data = result.json()

    videos = []

    for item in data["items"]:
        video = item["snippet"]

        videos.append(
            YoutubeVideo(
                title=video["title"],
                description=video["description"],
                published=video["publishedAt"],
                thumbnail_data=video["thumbnails"]["high"]["url"],
                url=f"https://www.youtube.com/watch?v={video['resourceId']['videoId']}"
            )
        )

    return videos
    
if __name__ == "__main__":
    get_youtube_videos()

