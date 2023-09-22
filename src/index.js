//Modules
import { render } from "react-dom";
import axios from "axios";
// CSS
import "./Normalizatoin.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";

axios.BASE_URL = "http://localhost:5000";

render(<App />, document.getElementById("root"));
