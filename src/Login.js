// Modules
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// Components
import AlretMsg from "./components/AlertMsg";

export default function Login({ toggleTxtAppearance }) {
  const navigate = useNavigate();
  const [[msgType, msgContent], setMsg] = useState(["", ""]);
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const {
        data: {
          data: { token, name },
        },
      } = await axios.post(axios.BASE_URL + "/auth/login", formData);
      localStorage.setItem("user", JSON.stringify({ token, name }));
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
      <AlretMsg type={msgType} msg={msgContent} setMsg={setMsg} />
      <form
        className="p-4 rounded w-50 border auth-content"
        onSubmit={handleSubmit}
      >
        <h1>Sign in</h1>
        <div>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
          <button type="submit" className="hover-yellow w-100 p-2 rounded">
            Login
          </button>
        </div>
        <Link>Forgot password?</Link>
        <br />
        <Link to="/auth/send-email-confirmation" state={{ email }}>
          Confirm email
        </Link>
      </form>
      <div className="center-line-con w-50 border-bottom">
        <p className="center-line-content">New to Amazon?</p>
      </div>
      <button
        type="button"
        className="w-50 p-2 rounded border"
        onClick={() => navigate("/auth/signup")}
      >
        Create your Amazon account
      </button>
    </>
  );
}
