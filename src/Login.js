export default function Login({ toggleTxtAppearance, handleAuthState }) {
  return (
    <>
      <form>
        <h1>Sign in</h1>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <label for="password">Password</label>
        <div className="password-con c-i">
          <input type="password" id="password" name="password" required />
          <i
            className="fa-solid fa-eye hover-yellow-i"
            onClick={toggleTxtAppearance}
          ></i>
        </div>
        <div>
          <button type="submit" className="hover-yellow">
            Login
          </button>
        </div>
      </form>
      <div className="center-line-con">
        <p className="center-line-content">New to Amazon?</p>
      </div>
      <button type="button" onClick={handleAuthState}>
        Create your Amazon account
      </button>
    </>
  );
}
