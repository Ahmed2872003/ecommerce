import axios from "axios";

const token = localStorage.getItem("token");

const axiosAPI = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_URL || "",
  headers: {
    Authorization: token,
  },
});

export { axiosAPI };
