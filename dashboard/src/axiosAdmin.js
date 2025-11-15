import axios from "axios";

const adminApi = axios.create({
  baseURL: "https://mediserve-final-project.onrender.com/api/v1",
});

export default adminApi;
