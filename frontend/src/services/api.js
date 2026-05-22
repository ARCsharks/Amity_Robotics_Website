import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3155",
});

export default api;