import axios from "axios";

const HttpInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default HttpInstance;
