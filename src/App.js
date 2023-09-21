// Components
import Auth from "./Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// CSS
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<p>Home page</p>}></Route>
        <Route path="/auth/*" element={<Auth />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
