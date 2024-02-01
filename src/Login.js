// Modules
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// Components
import AlretMsg from "./components/AlertMsg";
import TogglePass from "./components/togglePass";

export default function Login() {
  const navigate = useNavigate();
  const [[msgType, msgContent], setMsg] = useState(["", ""]);
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await axios.post(axios.BASE_URL + "/auth/login", formData);

      navigate("/");
    } catch (err) {
      if (err.response) setMsg(["error", err.response.data.msg]);
      else if (err.code === "ERR_NETWORK")
        setMsg(["error", "Server error pelase try again later."]);
      else console.log(err);
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
