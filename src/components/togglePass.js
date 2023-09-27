export default function TogglePass({ id, name, validateHandler }) {
  return (
    <>
      <div className="c-i gap-2">
        <input
          className="w-100"
          type="password"
          {...{ id, name }}
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
    </>
  );
}

function toggleTxtAppearance(e) {
  const passInput = e.target.parentNode.querySelector("input");
  const toggleBtn = e.target;

  if (passInput.getAttribute("type") === "password") {
    toggleBtn.style.color = "var(--amz-alt-yellow)";
    passInput.setAttribute("type", "text");
  } else {
    toggleBtn.style.color = "";
    passInput.setAttribute("type", "password");
  }
}
