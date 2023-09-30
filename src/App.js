// Components
import Auth from "./Auth";
import MainApp from "./MainApp";
// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom";
// CSS
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />}></Route>
        <Route path="/auth/*" element={<Auth />}></Route>
        <Route path="*" element={<p>Not found</p>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
