// MODULES
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
// CSS
import "./SendAuthEmail.css";
// Components
import AlertMsg from "./AlertMsg";

const neededMinutes = 1;
const neededSeconds = 0;

function SendEmail({ URL_Request, title, hint }) {
  const { state } = useLocation();

  let email;

  if (state) {
    email = state.email;
  }

  const [timer, setTimer] = useState({
    minutes: (email && neededMinutes) || 0,
    seconds: (email && neededSeconds) || 0,
  });

  const [[msgType, msgContent], setMsg] = useState(["", ""]);

  useEffect(() => {
    let intervalId;
    (async () => {
      if (email) intervalId = await send();
    })();
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  async function send(e) {
    if (e) {
      e.preventDefault();
    }
    const formData = new FormData(document.getElementById("send-e-con"));

    const interval = countDown(
      { minutes: neededMinutes, seconds: neededSeconds },
      setTimer
    );

    try {
      const {
        data: { msg },
      } = await axios.post(axios.BASE_URL + URL_Request, formData);
      setMsg(["success", msg]);
    } catch (err) {
      if (err.response) setMsg(["error", err.response.data.msg]);
      else if (err.code === "ERR_NETWORK")
        setMsg(["error", "Server error pelase try again later."]);
      else console.log(err);
      clearInterval(interval);
      setTimer({ minutes: 0, seconds: 0 });
    }
    return interval;
  }

  const formatedTime = `${timer.minutes < 10 ? "0" : ""}${timer.minutes}:${
    timer.seconds < 10 ? "0" : ""
  }${timer.seconds}`;

  return (
    <>
      <AlertMsg type={msgType} msg={msgContent} setMsg={setMsg} />
      <div className="p-4 rounded w-50 border auth-content">
        <h1>{title}</h1>
        <label>Email</label>
        <form id="send-e-con" onSubmit={send}>
          <input
            className="w-100"
            type="email"
            name="email"
            readOnly={email ? true : false}
            defaultValue={email}
            placeholder="Your email"
          />
          <button
            type="submit"
            className="hover-yellow rounded"
            disabled={timer.minutes || timer.seconds ? true : false}
          >
            Send
          </button>
        </form>
        <div className="hint">
          <i className="fa-solid fa-circle-exclamation"></i>
          <p>{hint}</p>
        </div>
        <p id="timer">{formatedTime}</p>
      </div>
      <Link to="/auth/login" className="w-50 p-2 reg-btn border rounded">
        Sign in
      </Link>
    </>
  );
}

export default function DirectEmailType({ type }) {
  const info = {};

  switch (type) {
    case "emailConfirmation":
    default: {
      info.URL_Request = "/email/confirm";
      info.title = "Send confirmation";
      info.hint =
        "When you click the link that has been sent to that email you can login";
      break;
    }
    case "resetPassword": {
      info.URL_Request = "/email/reset/password";
      info.title = "Reset password";
      info.hint =
        "You can know the process of reseting password by the email that have been sent to you";
      break;
    }
  }

  return <SendEmail {...info} />;
}

function countDown({ minutes: m, seconds: s }, setTimer) {
  let totalInS = Math.floor(m * 60 + s);

  const interval = setInterval(function () {
    if (totalInS < 0) {
      clearInterval(interval);
      return;
    }

    const minutes = Math.floor(totalInS / 60);

    const seconds = totalInS % 60;

    setTimer({
      minutes,
      seconds,
    });

    totalInS--;
  }, 1000);
  return interval;
}
