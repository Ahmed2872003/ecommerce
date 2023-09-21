// Modules
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// Components
import AlretMsg from "./components/AlertMsg";

export default function Login({ toggleTxtAppearance }) {
  const navigate = useNavigate();
  const [[msgType, msgContent], setMsg] = useState(["", ""]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const {
        data: {
          data: { token, name },
        },
      } = await axios.post(axios.BASE_URL + "/customer/auth/login", formData);
      localStorage.setItem("user", JSON.stringify({ token, name }));
      navigate("/");
    } catch (err) {
      setMsg(["error", err.response.data.msg]);
    }
  }
  return (
    <>
      <AlretMsg type={msgType} msg={msgContent} setMsg={setMsg} />
      <form className="container" onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <label for="password">Password</label>
        <div className="password-con c-i">
          <input type="password" id="password" name="password" required />
          <i
            className="fa-solid fa-eye hover-yellow-i"
            onClick={toggleTxtAppearance}
          ></i>
        </div>
        <div>
          <button type="submit" className="hover-yellow">
            Login
          </button>
        </div>
        <Link>Forgot password?</Link>
      </form>
      <div className="center-line-con">
        <p className="center-line-content">New to Amazon?</p>
      </div>
      <button type="button" onClick={() => navigate("/auth/signup")}>
        Create your Amazon account
      </button>
    </>
  );
}
