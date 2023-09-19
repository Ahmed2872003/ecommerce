// Modules
import { useState } from "react";
// CSS
import "./auth.css";
// Components
import Login from "./Login";
import Signup from "./Signup";
import AlertMsg from "./components/AlertMsg";

export default function Auth() {
  const [auth, setAuth] = useState("login");

  function handleAuthState() {
    setAuth((prevState) => (prevState === "login" ? "signup" : "login"));
  }

  return (
    <div id="auth-con" className="c-i d-c">
      <img
        src={require("./images/amz-logo.png")}
        alt="amazon-logo"
        width="200"
      />
      {auth === "login" ? (
        <Login
          toggleTxtAppearance={toggleTxtAppearance}
          handleAuthState={handleAuthState}
        />
      ) : (
        <Signup
          toggleTxtAppearance={toggleTxtAppearance}
          handleAuthState={handleAuthState}
        />
      )}
    </div>
  );
}
function toggleTxtAppearance(e) {
  console.log();
  const passInput = e.target.parentNode.querySelector('input[name="password"]');
  const toggleBtn = e.target;

  if (passInput.getAttribute("type") === "password") {
    toggleBtn.style.color = "var(--amz-alt-yellow)";
    passInput.setAttribute("type", "text");
  } else {
    toggleBtn.style.color = "";
    passInput.setAttribute("type", "password");
  }
}
