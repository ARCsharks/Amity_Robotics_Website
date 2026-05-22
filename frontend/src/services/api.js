import axios from "axios";

const api = axios.create({
  baseURL: "https://data.arcsharks.com.au",
});

export default api;