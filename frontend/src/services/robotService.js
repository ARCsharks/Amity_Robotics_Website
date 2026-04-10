import api from "./api";

export const getRobots = async () => {
    const response = await api.get("/robots");
    return response.data;
};

export const createRobot = async (data) => {
    const response = await api.post("/robots", {
        name: data.name,
        year: data.year,
        description: data.description,
        image_data: data.image_data
    });
    return response.data;
};
