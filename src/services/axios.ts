import axios, { Axios } from "axios";

const jwt = localStorage.getItem("authKey");

const { VITE_APP_API_URL } = import.meta.env;
export const axiosAuth: Axios = axios.create({
  baseURL: VITE_APP_API_URL,
  timeout: 5000,
});

export const axiosApi: Axios = axios.create({
  baseURL: VITE_APP_API_URL,
  timeout: 5000,
  headers: {
    Authorization: `${jwt}`,
  },
});
