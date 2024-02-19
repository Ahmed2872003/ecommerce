//Modules
import { createRoot } from "react-dom/client";
import "./util/axios";
// CSS
import "./Normalizatoin.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(<App />);
