import api from "./api";

export const getSponsorData = async () => {
    const response = await api.get("/sponsors");
    return response.data;
};
