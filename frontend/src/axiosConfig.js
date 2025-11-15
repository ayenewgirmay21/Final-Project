import axios from "axios";

const api = axios.create({
  baseURL: "https://mediserve-final-project.onrender.com/api/v1",
  withCredentials: true,
});

export default api;
