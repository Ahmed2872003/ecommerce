//Modules
import { createRoot } from "react-dom/client";
// CSS
import "./Normalizatoin.css";
import "bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/js/dist/dropdown";

import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(<App />);
