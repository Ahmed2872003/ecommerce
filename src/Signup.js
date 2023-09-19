import { useState } from "react";
import AlertMsg from "./components/AlertMsg";

export default function Signup({ toggleTxtAppearance, handleAuthState }) {
  const [[msgType, msgContent], setMsg] = useState(["", ""]);

  function changeMsg(e) {}

  return (
    <>
      <AlertMsg type={msgType} msg={msgContent} />
      <form>
        <h1>Create account</h1>
        <div className="c-i" style={{ gap: 20 }}>
          <div>
            <label for="first_name">First name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              maxLength="20"
              onChange={(e) => validateData(e, setMsg)}
              onFocus={(e) => validateData(e, setMsg)}
              required
            />
          </div>
          <div>
            <label for="last_name">Last name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              maxLength="20"
              onChange={(e) => validateData(e, setMsg)}
              onFocus={(e) => validateData(e, setMsg)}
              required
            />
          </div>
        </div>
        <div>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => validateData(e, setMsg)}
            onFocus={(e) => validateData(e, setMsg)}
            required
          />
        </div>
        <label for="password">Password</label>
        <div className="password-con c-i">
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => validateData(e, setMsg)}
            onFocus={(e) => validateData(e, setMsg)}
            required
          />
          <i
            className="fa-solid fa-eye hover-yellow-i"
            onClick={toggleTxtAppearance}
          ></i>
        </div>
        <label for="re-enterPass">Re-enter password</label>
        <div className="password-con c-i">
          <input type="password" id="re-enterPass" name="password" required />
          <i
            className="fa-solid fa-eye hover-yellow-i"
            onClick={toggleTxtAppearance}
          ></i>
        </div>
        <div>
          <label for="phone">Phone</label>
          <input type="text" id="phone" name="phone" required />
        </div>
        <div>
          <label for="address">Address</label>
          <input type="text" id="address" name="address" required />
        </div>
        <div>
          <label for="city">City</label>
          <input type="text" id="city" name="city" required />
        </div>
        <div>
          <label for="country">Country</label>
          <input type="text" id="country" name="country" required />
        </div>
        <div>
          <label for="zip-codd">Zip code</label>
          <input type="text" id="zip-codd" name="zip_code" required />
        </div>
        <div className="c-i" style={{ justifyContent: "normal" }}>
          <input type="checkbox" name="seller" id="seller" />
          <label for="seller">Seller account</label>
        </div>
        <div>
          <button type="submit" className="hover-yellow" onClick={changeMsg}>
            Create
          </button>
        </div>
      </form>
      <div className="center-line-con">
        <p className="center-line-content">Already have an account?</p>
      </div>
      <button type="button" onClick={handleAuthState}>
        Sign in
      </button>
    </>
  );
}

function validateData(e, setMsg) {
  const targetInput = e.target;

  const targetName = document.querySelector(
    `label[for="${targetInput.getAttribute("id")}"]`
  ).innerText;

  const val = targetInput.value;
  let isThereError = false;
  let errMessage = "";

  if (!val && e.type !== "focus") {
    isThereError = true;
    errMessage = `${targetName} shouldn't be empty`;
  } else if (targetName === "First name" || targetName === "Last name") {
    const nameRegExp = /[^a-z]/i;
    if (nameRegExp.test(val)) {
      isThereError = true;
      errMessage = `${targetName} should be only characters`;
    }
  } else if (targetName === "Email") {
    const emailRegExp = /^\w+@gmail\.[a-z]{2,4}$/;
    if (!emailRegExp.test(val) && val) {
      isThereError = true;
      errMessage = "Provide a valid email. ex. test12@gmail.com";
    }
  }

  if (isThereError) {
    setMsg(["error", errMessage]);
    targetInput.classList.add("wrong-input");
  } else {
    setMsg(["", ""]);
    targetInput.classList.remove("wrong-input");
  }
}
