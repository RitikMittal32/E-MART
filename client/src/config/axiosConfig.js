// src/config/axiosConfig.js
import axios from "axios";

const BASE_URL = "https://e-mart-1.onrender.com"; // Replace with your actual base URL

axios.defaults.baseURL = BASE_URL;

export default axios;
