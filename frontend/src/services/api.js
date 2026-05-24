import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2469",
});

export default api;