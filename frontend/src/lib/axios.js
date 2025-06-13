//?Axios is a tool that helps your JavaScript app talk to servers and fetch data.

import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:import.meta.env.MODE === "development" ? "http://localhost:1000/api" : "/api",
    withCredentials: true
})