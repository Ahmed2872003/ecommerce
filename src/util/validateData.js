export default function validateData(e, setMsg) {
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
