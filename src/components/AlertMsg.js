// CSS
import { useState } from "react";
import "./alertMsg.css";

export default function AlertMsg(props) {
  function hideAlertMsg() {
    const alertMsgCon = document.querySelector(".alert-msg-con");
    alertMsgCon.classList.remove("show-con");
  }
  setTimeout(() => {
    const alertMsgCon = document.querySelector(".alert-msg-con");
    if (props.msg) alertMsgCon.classList.add("show-con");
    else alertMsgCon.classList.remove("show-con");
  }, 100);

  return (
    <div
      className={`alert-msg-con  ${props.type ? `${props.type}-con` : ""} c-i`}
    >
      <p>{props.msg}</p>
      <i
        className="fa-solid fa-circle-xmark hover-red-i"
        onClick={hideAlertMsg}
      ></i>
    </div>
  );
}
