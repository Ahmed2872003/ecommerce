// Modules
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
// CSS
import "./auth.css";
// Components
import Login from "./Login";
import Signup from "./Signup";
import EmailConfirmation from "./EmailConfirmation";

export default function Auth() {
  const navigate = useNavigate();
  return (
    <div id="auth-con" className="c-i d-c">
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
        <Route
          path="send-email-confirmation"
          element={<EmailConfirmation />}
        ></Route>
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
    <div className="container">
      <Link to="login" className="custom-a hover-yellow">
        Login
      </Link>
      <br />
      <Link to="signup" className="custom-a hover-yellow">
        Register
      </Link>
    </div>
  );
}
