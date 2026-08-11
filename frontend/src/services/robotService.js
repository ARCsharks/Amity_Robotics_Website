import api from "./api";

export const getRobots = async () => {
    const response = await api.get("/robots");
    return response.data;
};

