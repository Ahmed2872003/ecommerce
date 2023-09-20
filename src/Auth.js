// Modules
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// CSS
import "./auth.css";
// Components
import Login from "./Login";
import Signup from "./Signup";
import EmailConfirmation from "./EmailConfirmation";

export default function Auth() {
  return (
    <div id="auth-con" className="c-i d-c">
      <img
        src={require("./images/amz-logo.png")}
        alt="amazon-logo"
        width="200"
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login toggleTxtAppearance={toggleTxtAppearance} />}
          ></Route>
          <Route
            path="/signup"
            element={<Signup toggleTxtAppearance={toggleTxtAppearance} />}
          ></Route>
          <Route
            path="/send-email-confirmation"
            element={<EmailConfirmation />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function toggleTxtAppearance(e) {
  const passInput = e.target.parentNode.querySelector("input");
  const toggleBtn = e.target;

  if (passInput.getAttribute("type") === "password") {
    toggleBtn.style.color = "var(--amz-alt-yellow)";
    passInput.setAttribute("type", "text");
  } else {
    toggleBtn.style.color = "";
    passInput.setAttribute("type", "password");
  }
}
