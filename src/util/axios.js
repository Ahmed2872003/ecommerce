import axios from "axios";

axios.BASE_URL = process.env.REACT_APP_SERVER_URL || "";
axios.defaults.withCredentials = true;
