import axios from "axios";

console.log(process.env.REACT_APP_SERVER_URL);

axios.BASE_URL = process.env.REACT_APP_SERVER_URL;
axios.defaults.withCredentials = true;
