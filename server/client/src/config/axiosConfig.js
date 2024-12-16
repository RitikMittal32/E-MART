// src/config/axiosConfig.js
import axios from "axios";

const BASE_URL = "https://e-mart-1.onrender.com"; // Replace with your actual base URL
// const BASE_URL = "http://localhost:4080"; // Replace with your actual base URL
export const BACKEND_URL = "wss://e-mart-1.onrender.com";
// export const BACKEND_URL = "wss://localhost:4080";

axios.defaults.baseURL = BASE_URL;

export default axios;
