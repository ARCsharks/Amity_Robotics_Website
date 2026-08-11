import api from "./api";

export const getYoutubeVideos = async () => {
    const response = await api.get("/posts/youtube");
    return response.data;
}