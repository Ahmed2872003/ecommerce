//Modules
import { render } from "react-dom";
import axios from "axios";
// CSS
import App from "./App";
import "./Normalizatoin.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

axios.BASE_URL = "http://localhost:5000";

render(<App />, document.getElementById("root"));
