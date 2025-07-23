import axios from "axios";

// Dynamically set base URL depending on dev or production
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5050/api"
    : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
