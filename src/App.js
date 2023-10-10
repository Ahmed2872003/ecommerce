// Components
import Auth from "./Auth";
import MainApp from "./MainApp";
import NotFound from "./NotFound";
// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom";
// CSS
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainApp />}></Route>
        <Route path="/auth/*" element={<Auth />}></Route>
        <Route path="/notfoundpage" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
