// Modules
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosAPI } from "../util/axios";
// Components
import AlretMsg from "./AlertMsg";
import TogglePass from "./togglePass";

// Utils
import { authAPI } from "../util/API/APIS";

export default function Login() {
  const navigate = useNavigate();
  const [[msgType, msgContent], setMsg] = useState(["", ""]);
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const { customer, token } = await authAPI.login(formData);
      const auth = `Bearer ${token}`;

      localStorage.setItem("customer", JSON.stringify(customer));
      localStorage.setItem("token", auth);

      axiosAPI.defaults.headers = {
        ...axiosAPI.defaults.headers,
        Authorization: auth,
      };

      navigate("/");
    } catch (err) {
      setMsg(["error", err.message]);
    }
  }
  return (
    <>
      <AlretMsg type={msgType} msg={msgContent} setMsg={setMsg} top={15} />
      <form
        className="p-4 rounded w-50 border auth-content"
        onSubmit={handleSubmit}
      >
        <h1>Sign in</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="w-100"
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <label htmlFor="password">Password</label>

        <TogglePass id="password" name="password" />
        <div>
          <button type="submit" className="hover-yellow w-100 p-2 rounded">
            Login
          </button>
        </div>
        <Link to="/auth/reset/password" state={{ email }}>
          Forgot password?
        </Link>
        <br />
        <Link to="/auth/confirm/email" state={{ email }}>
          Confirm email
        </Link>
      </form>
      <div className="center-line-con w-50 border-bottom">
        <p className="center-line-content">New to Amazon?</p>
      </div>
      <Link className="w-50 p-2 reg-btn border rounded" to="/auth/signup">
        Create your Amazon account
      </Link>
    </>
  );
}
