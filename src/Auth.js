// Modules
import { Route, Link } from "react-router-dom";
// CSS
import "./Auth.css";
// Components
import Login from "./Login";
import Signup from "./Signup";
import SendAuthEmail from "./components/SendAuthEmail";
import ResetPass from "./ResetPass";
// Utils
import CustomSwitch from "./util/CustomSwitch";

export default function Auth() {
  return (
    <div id="auth-con" className="c-i d-c container">
      <img
        src={require("./images/amz-logo.png")}
        alt="amazon-logo"
        width="200"
      />
      <CustomSwitch>
        <Route index element={<MainAuthPage />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="confirm/email" element={<SendAuthEmail />}></Route>
        <Route
          path="reset/password"
          element={<SendAuthEmail type="resetPassword" />}
        ></Route>
        <Route path="reset/password/:token" element={<ResetPass />}></Route>
      </CustomSwitch>
    </div>
  );
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
