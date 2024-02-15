// Modules
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
// Components
import AlertMsg from "./AlertMsg";
import validateData from "../util/validateData";
import TogglePass from "./togglePass";

export default function ResetPass() {
  const [[type, msg], setMsg] = useState(["", ""]);

  const { token } = useParams();

  function validateHandler(e) {
    validateData(e, setMsg);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    formData.delete("repeated-password");

    const inputs = document.querySelectorAll("input");

    const isThereErrors = [...inputs].some((input) =>
      input.classList.contains("wrong-input")
    );

    if (isThereErrors) {
      setMsg(["error", "Can't submit the data before fixing the errors"]);
      return;
    }
    try {
      const {
        data: { msg },
      } = await axios.post(
        axios.BASE_URL + `/auth/reset/password/${token}`,
        formData
      );
      setMsg(["success", msg]);
    } catch (err) {
      if (err.response) setMsg(["error", err.response.data.msg]);
      else if (err.code === "ERR_NETWORK")
        setMsg(["error", "Server error pelase try again later."]);
      else console.log(err);
      console.log(err);
    }
  }

  return (
    <>
      <AlertMsg {...{ msg, type, setMsg }} />
      <form
        className="auth-content w-50 border p-4 rounded"
        onSubmit={handleSubmit}
      >
        <label htmlFor="password">Password</label>
        <TogglePass
          id="password"
          name="password"
          validateHandler={validateHandler}
        />
        <label htmlFor="re-enterPass">Re-enter password</label>
        <TogglePass
          id="re-enterPass"
          name="repeated-password"
          validateHandler={validateHandler}
        />

        <button type="submit" className="hover-yellow w-100 p-2 rounded">
          Reset
        </button>
      </form>
      <Link to="/auth/login" className="w-50 p-2 border reg-btn rounded">
        Sign in
      </Link>
    </>
  );
}
