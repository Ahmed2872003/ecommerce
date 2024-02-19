// CSS
import { useEffect } from "react";
import "./alertMsg.css";

export default function AlertMsg(props) {
  function hideAlertMsg() {
    const alertMsgCon = document.querySelector(".alert-msg-con");
    alertMsgCon.classList.remove("show-con");
    props.setMsg(["", ""]);
  }

  return (
    <div
      className={`alert-msg-con  ${props.type ? `${props.type}-con` : ""} c-i`}
      style={{
        display: props.msg ? "flex" : "none",
      }}
    >
      <p>{props.msg}</p>
      <i
        className="fa-solid fa-circle-xmark hover-red-i"
        onClick={hideAlertMsg}
      ></i>
    </div>
  );
}
