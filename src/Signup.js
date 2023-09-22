// Modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Components
import AlertMsg from "./components/AlertMsg";

export default function Signup({ toggleTxtAppearance, handleAuthState }) {
  const [[msgType, msgContent], setMsg] = useState(["", ""]);
  const navigate = useNavigate();

  function validateHandler(e) {
    validateData(e, setMsg);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    formData.delete("repeated-password");
    if (formData.get("seller")) formData.set("seller", true);

    const inputs = document.querySelectorAll("input");

    const isThereErrors = [...inputs].some((input) =>
      input.classList.contains("wrong-input")
    );

    if (isThereErrors) {
      setMsg(["error", "Can't submit the data before fixing the errors"]);
      return;
    }

    try {
      await axios.post(axios.BASE_URL + "/auth/signup", formData);
      setMsg(["success", "Account have been created successfully"]);
      setTimeout(() => {
        navigate("/auth/send-email-confirmation", {
          state: { email: formData.get("email") },
        });
      }, 1000);
    } catch (err) {
      if (err.response) setMsg(["error", err.response.data.msg]);
      else if (err.code === "ERR_NETWORK")
        setMsg(["error", "Server error pelase try again later."]);
      else console.log(err);
    }
  }

  return (
    <>
      <AlertMsg type={msgType} msg={msgContent} setMsg={setMsg} />
      <form
        onSubmit={handleSubmit}
        className="auth-content w-50 border p-4 rounded"
      >
        <h1>Create account</h1>
        <div className="d-flex" style={{ gap: 20 }}>
          <div className="flex-fill">
            <label for="first_name">First name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              maxLength="20"
              onChange={validateHandler}
              onFocus={validateHandler}
              onBlur={validateHandler}
              required
            />
          </div>
          <div className="flex-fill">
            <label for="last_name">Last name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              maxLength="20"
              onChange={validateHandler}
              onFocus={validateHandler}
              onBlur={validateHandler}
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
            onChange={validateHandler}
            onFocus={validateHandler}
            onBlur={validateHandler}
            required
          />
        </div>
        <label for="password">Password</label>
        <div className="password-con c-i">
          <input
            type="password"
            id="password"
            name="password"
            onChange={validateHandler}
            onFocus={validateHandler}
            onBlur={validateHandler}
            required
          />
          <i
            className="fa-solid fa-eye hover-yellow-i"
            onClick={toggleTxtAppearance}
          ></i>
        </div>
        <label for="re-enterPass">Re-enter password</label>
        <div className="password-con c-i">
          <input
            type="password"
            id="re-enterPass"
            name="repeated-password"
            onChange={validateHandler}
            onFocus={validateHandler}
            onBlur={validateHandler}
            required
          />
          <i
            className="fa-solid fa-eye hover-yellow-i"
            onClick={toggleTxtAppearance}
          ></i>
        </div>
        <div>
          <label for="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            onChange={validateHandler}
            onFocus={validateHandler}
            onBlur={validateHandler}
            required
          />
        </div>
        <div>
          <label for="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={validateHandler}
            onFocus={validateHandler}
            onBlur={validateHandler}
            required
          />
          <div className="hint">
            <i class="fa-solid fa-circle-exclamation"></i>
            <p>Building number, Street name, Area name</p>
          </div>
        </div>
        <div>
          <label for="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            onFocus={validateHandler}
            onBlur={validateHandler}
            required
          />
        </div>
        <div>
          <label for="country">Country</label>
          {/* <input type="" id="country" name="country" required /> */}
          <select
            name="country"
            id="country"
            defaultValue="Egypt"
            defaultChecked
          >
            <option value="Egypt">Egypt</option>
            <option value="United States">United States</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="Canada">Canada</option>
            <option value="France">France</option>
            <option value="China">China</option>
            <option value="Argentina">Argentina</option>
            <option value="Japan">Japan</option>
          </select>
        </div>
        <div>
          <label for="zip-codd">Zip code</label>
          <input
            type="text"
            id="zip-codd"
            name="zip_code"
            onChange={validateHandler}
            onFocus={validateHandler}
            onBlur={validateHandler}
            required
          />
        </div>
        <div className="c-i" style={{ justifyContent: "normal" }}>
          <input type="checkbox" name="seller" id="seller" />
          <label for="seller">Seller account</label>
        </div>
        <div>
          <button type="submit" className="hover-yellow w-100 p-2 rounded">
            Create
          </button>
        </div>
      </form>
      <div className="center-line-con w-50 border-bottom">
        <p className="center-line-content">Already have an account?</p>
      </div>
      <button
        type="button"
        className="w-50 rounded p-2 border"
        onClick={() => navigate("/auth/login")}
      >
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

  const targetValue = targetInput.value;
  let isThereError = false;
  let errMessage = "";

  if (!targetValue) {
    isThereError = true;
    errMessage = `${targetName} shouldn't be empty`;
  } else if (targetName === "First name" || targetName === "Last name") {
    const nameRegExp = /[^a-z]/i;

    if (nameRegExp.test(targetValue)) {
      isThereError = true;

      errMessage = `${targetName} should be only characters`;
    }
  } else if (targetName === "Email") {
    const emailRegExp = /^\w+@gmail\.[a-z]{2,4}$/;

    if (!emailRegExp.test(targetValue)) {
      isThereError = true;

      errMessage = "Provide a valid email. ex. test12@gmail.com";
    }
  } else if (targetName === "Password") {
    if (targetValue.length < 8) {
      isThereError = true;

      errMessage = "Password length should be at least 8";
    }
    const reEnterPassinput = document.querySelector("#re-enterPass");
    if (reEnterPassinput.value !== targetValue) {
      isThereError = true;

      errMessage = "Two passwords are diffrent";

      reEnterPassinput.classList.add("wrong-input");
    } else reEnterPassinput.classList.remove("wrong-input");
  } else if (targetName === "Re-enter password") {
    const passwordInput = document.querySelector("#password");

    if (passwordInput.value !== targetValue) {
      isThereError = true;

      errMessage = "Two passwords are diffrent";
      passwordInput.classList.add("wrong-input");
    } else passwordInput.classList.remove("wrong-input");
  } else if (targetName === "Phone") {
    const phoneRegExp = /^0(10|11|12|15)[0-9]{8}$/;

    if (!phoneRegExp.test(targetValue)) {
      isThereError = true;

      errMessage = `Provide a valid ${targetName} number. ex.0-(10 or 11 or 12 or 15)-xxxx-xxxx`;
    }
  } else if (targetName === "Address") {
    const addressRegExp = /^[#.0-9a-zA-Z\u0621-\u064A\u0660-\u0669\s,-]+$/;
    if (!addressRegExp.test(targetValue)) {
      isThereError = true;
      errMessage = `Provide a valid ${targetName} (with no special characters). ex. Building number, Street name, Area name`;
    }
  } else if (targetName === "Zip code") {
    const codeRegExp = /^\d{5}$/;
    if (!codeRegExp.test(targetValue)) {
      isThereError = true;
      errMessage = `${targetName} should be only digits. ex. xxxxx`;
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
