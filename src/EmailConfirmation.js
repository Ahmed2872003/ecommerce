// MODULES
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// CSS
import "./emailConfirmation.css";

let minutes = 1;
let seconds = 0;

export default function EmailConfirmation() {
  const {
    state: { email },
  } = useLocation();

  const [timer, setTimer] = useState({ minutes, seconds });

  useEffect(() => {
    sendEmailConf(timer, setTimer);
  }, []);

  const formatedTime = `${timer.minutes < 10 ? "0" : ""}${timer.minutes}:${
    timer.seconds < 10 ? "0" : ""
  }${timer.seconds}`;

  return (
    <div className="container">
      <h1>Send confirmation</h1>
      <div id="conf-con">
        <input value={email} readOnly />
        <button
          type="button"
          className="hover-yellow"
          onClick={() => sendEmailConf(timer, setTimer)}
          disabled={timer.minutes || timer.seconds ? "disabled" : ""}
        >
          Send
        </button>
      </div>
      <p id="timer">{formatedTime}</p>
    </div>
  );
}

function sendEmailConf(timer, setTimer) {
  countDown(
    { minutes: timer.minutes || minutes, seconds: timer.seconds || seconds },
    setTimer
  );
  // Request the server
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
