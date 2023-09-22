// Modules
import { Routes, Route, Link } from "react-router-dom";
// CSS
import "./Auth.css";
// Components
import Login from "./Login";
import Signup from "./Signup";
import SendEmail from "./SendEmail";

export default function Auth() {
  return (
    <div id="auth-con" className="c-i d-c container">
      <img
        src={require("./images/amz-logo.png")}
        alt="amazon-logo"
        width="200"
      />
      <Routes>
        <Route index element={<MainAuthPage />}></Route>
        <Route
          path="login"
          element={<Login toggleTxtAppearance={toggleTxtAppearance} />}
        ></Route>
        <Route
          path="signup"
          element={<Signup toggleTxtAppearance={toggleTxtAppearance} />}
        ></Route>
        <Route path="send-email-confirmation" element={<SendEmail />}></Route>
      </Routes>
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

function MainAuthPage() {
  return (
    <div className="w-50">
      <Link to="login" className="custom-a hover-yellow w-100">
        Login
      </Link>
      <br />
      <Link to="signup" className="custom-a hover-yellow w-100">
        Register
      </Link>
    </div>
  );
}
