// MODULES
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
// CSS
import "./emailConfirmation.css";
// Components
import AlertMsg from "./components/AlertMsg";

let minutes = 1;
let seconds = 0;

export default function EmailConfirmation() {
  const {
    state: { email },
  } = useLocation();

  const [timer, setTimer] = useState({ minutes, seconds });

  const [[msgType, msgContent], setMsg] = useState(["", ""]);

  useEffect(() => {
    sendEmailConf(timer, setTimer);
  }, []);

  async function sendEmailConf() {
    countDown(
      { minutes: timer.minutes || minutes, seconds: timer.seconds || seconds },
      setTimer
    );
    try {
      const {
        data: { msg },
      } = await axios.post(axios.BASE_URL + "/email/confirmation", { email });
      setMsg(["success", msg]);
    } catch (err) {
      setMsg(["error", err.response.data.msg]);
    }
  }

  const formatedTime = `${timer.minutes < 10 ? "0" : ""}${timer.minutes}:${
    timer.seconds < 10 ? "0" : ""
  }${timer.seconds}`;

  return (
    <>
      <AlertMsg type={msgType} msg={msgContent} setMsg={setMsg} />
      <div className="container">
        <h1>Send confirmation</h1>
        <div id="conf-con">
          <input value={email} readOnly />
          <button
            type="button"
            className="hover-yellow"
            onClick={sendEmailConf}
            disabled={timer.minutes || timer.seconds ? "disabled" : ""}
          >
            Send
          </button>
        </div>
        <div className="hint">
          <i class="fa-solid fa-circle-exclamation"></i>
          <p>
            When you click the link that has been sent to that email you can
            login
          </p>
        </div>
        <p id="timer">{formatedTime}</p>
      </div>
      <Link to="/auth/login" style={{ border: "1px solid var(--amz-borderC)" }}>
        Login
      </Link>
    </>
  );
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
}
