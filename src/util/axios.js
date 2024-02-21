import axios from "axios";

const axiosAPI = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_URL || "",
});

export { axiosAPI };
