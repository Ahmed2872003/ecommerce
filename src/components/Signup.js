// Modules
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Components
import AlertMsg from "./AlertMsg";
import validateData from "../util/validateData";
import TogglePass from "./togglePass";

// Utils
import { authAPI } from "../util/API/APIS";

export default function Signup({ handleAuthState }) {
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
      await authAPI.signup(formData);
      setMsg(["success", "Account have been created successfully"]);
      setTimeout(() => {
        navigate("/auth/confirm/email", {
          state: { email: formData.get("email") },
        });
      }, 1000);
    } catch (err) {
      setMsg(["error", err.message]);
    }
  }

  return (
    <>
      <AlertMsg type={msgType} msg={msgContent} setMsg={setMsg} top={15} />
      <form
        onSubmit={handleSubmit}
        className="auth-content w-50 border p-4 rounded"
      >
        <h1>Create account</h1>
        <div className="d-flex" style={{ gap: 20 }}>
          <div className="flex-fill">
            <label htmlFor="first_name">First name</label>
            <input
              className="w-100"
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
            <label htmlFor="last_name">Last name</label>
            <input
              className="w-100"
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
          <label htmlFor="email">Email</label>
          <input
            className="w-100"
            type="email"
            id="email"
            name="email"
            onChange={validateHandler}
            onFocus={validateHandler}
            onBlur={validateHandler}
            required
          />
        </div>
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

        <div>
          <label htmlFor="phone">Phone</label>
          <input
            className="w-100"
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
          <label htmlFor="address">Address</label>
          <input
            className="w-100"
            type="text"
            id="address"
            name="address"
            onChange={validateHandler}
            onFocus={validateHandler}
            onBlur={validateHandler}
            required
          />
          <div className="hint">
            <i className="fa-solid fa-circle-exclamation"></i>
            <p>Building number, Street name, Area name</p>
          </div>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            className="w-100"
            type="text"
            id="city"
            name="city"
            onFocus={validateHandler}
            onBlur={validateHandler}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          {/* <input type="" id="country" name="country" required /> */}
          <select
            className="w-100"
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
          <label htmlFor="zip-codd">Zip code</label>
          <input
            className="w-100"
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
          <label htmlFor="seller">Seller account</label>
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
      <Link className="w-50 p-2 reg-btn border rounded" to="/auth/login">
        Sign in
      </Link>
    </>
  );
}
