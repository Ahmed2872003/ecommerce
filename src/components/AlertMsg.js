// CSS
import { useEffect } from "react";
import "./alertMsg.css";

console.log("Hello");

export default function AlertMsg(props) {
  function hideAlertMsg() {
    const alertMsgCon = document.querySelector(".alert-msg-con");
    alertMsgCon.classList.remove("show-con");
    props.setMsg(["", ""]);
  }
  // useEffect(() => {
  //   const alertMsgCon = document.querySelector(".alert-msg-con");
  //   if (props.msg) alertMsgCon.classList.add("show-con");
  //   else alertMsgCon.classList.remove("show-con");
  // }, [props.msg]);

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
