// Modules
import { Link, useNavigate } from "react-router-dom";
// CSS
import "./Header.css";

export default function Header({ user, isLoggedIn }) {
  const navigate = useNavigate();

  return (
    <header id="main-header">
      <Link to="/" className="p-2">
        <img
          src={require("./images/amz-white-logo.png")}
          alt="amz-logo"
          width="113"
        />
      </Link>
      <form className="search">
        <select name="category" defaultValue="All">
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Computers">Computers</option>
          <option value="Fitness">Fitness</option>
          <option value="Cameras">Cameras</option>
          <option value="Home">Home</option>
        </select>
        <input placeholder="Search Amazon" type="text" />
        <button type="submit" className="hover-yellow">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <div
        className="drop-list p-2"
        onClick={() => (isLoggedIn ? "" : navigate("/auth/login"))}
      >
        <p>Hello, {isLoggedIn ? user.first_name : "sign in"}</p>
        <p>
          Account & Lists <i className="fa-solid fa-caret-down"></i>
        </p>
        <div
          className="list p-3 hidden border"
          onClick={(e) => e.stopPropagation()}
        >
          {!isLoggedIn && (
            <div className="auth-nav">
              <Link to="/auth/login" className="rounded hover-yellow p-2">
                Sign in
              </Link>
              <p>
                New customer <Link to="/auth/signup">Start here</Link>.
              </p>
            </div>
          )}
          <div className="list-content">
            <div className="lists-sec">
              <h6 style={{ fontWeight: "var(--font-w-b)" }}>Your Lists</h6>
              <Link>Create a List</Link>
            </div>
            <ul className="account-sec m-0">
              <h6 style={{ fontWeight: "var(--font-w-b)" }}>Your Account</h6>
              <li>
                <Link>Your Account</Link>
              </li>
              <li>
                <Link>Your Orders</Link>
              </li>
              <li>
                <Link>Your Addresses</Link>
              </li>
              <li>
                <Link>Your Lists</Link>
              </li>
              <li>
                <Link>Your Recommendations</Link>
              </li>
              <li>
                <Link>Your Prime Membership</Link>
              </li>
              <li>
                <Link>Your Seller Account</Link>
              </li>
              <li>
                <Link></Link>
              </li>
              <li>
                <Link></Link>
              </li>
              <li>
                <Link></Link>
              </li>
              <li>
                <Link></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Link to="/" className="p-2">
        Orders
      </Link>
    </header>
  );
}
