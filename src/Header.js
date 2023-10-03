// Modules
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// CSS
import "./Header.css";
import axios from "axios";

export default function Header({ user, isLoggedIn }) {
  const navigate = useNavigate();

  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  useEffect(() => {
    let timeoutId;

    if (!isLoggedIn) {
      const authNav = document.querySelector(".temp-auth-nav");

      toggleAppearance(authNav, { show: true });

      timeoutId = setTimeout(() => {
        toggleAppearance(authNav, { show: false });
      }, 1000 * 10);

      authNav.onmouseleave = (e) => {
        e.stopPropagation();
        timeoutId = setTimeout(() => {
          toggleAppearance(authNav, { show: false });
        }, 1000 * 10);
      };

      authNav.onmouseenter = (e) => {
        clearTimeout(timeoutId);
      };
    }

    function handleDocClickEvent(e) {
      handleListsAppearance("nav-list");
    }

    document.addEventListener("click", handleDocClickEvent);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleDocClickEvent);
    };
  }, []);

  return (
    <header id="main-header">
      <div>
        <Link to="/" className="p-2 d-flex align-items-center">
          <img
            src={require("./images/amz-white-logo.png")}
            alt="amz-logo"
            width="113"
          />
        </Link>
        <form className="search align-self-center">
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
          onClick={(e) => (isLoggedIn ? "" : navigate("/auth/login"))}
          onMouseEnter={(e) => {
            if (!e.target.classList.contains("temp-auth-nav")) {
              handleListsAppearance("nav-list");
              toggleAppearance(document.querySelector(".list"), { show: true });
            }
          }}
          onMouseLeave={(e) =>
            toggleAppearance(document.querySelector(".list"), { show: false })
          }
        >
          <p>Hello, {isLoggedIn ? user.first_name : "sign in"}</p>
          <p>
            Account & Lists <i className="fa-solid fa-caret-down"></i>
          </p>
          <div
            className="auth-nav temp-auth-nav p-3 border rounded nav-list hidden"
            onClick={(e) => e.stopPropagation()}
            onMouseLeave={(e) => e.stopPropagation()}
          >
            <Link to="/auth/login" className="rounded hover-yellow p-2">
              Sign in
            </Link>
            <p>
              New customer <Link to="/auth/signup">Start here</Link>.
            </p>
          </div>
          <div
            className="list p-3 border nav-list hidden"
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
                {isLoggedIn && (
                  <li>
                    <Link
                      to="/auth/login"
                      onClick={async () => {
                        await axios.get(axios.BASE_URL + "/auth/logout");
                      }}
                    >
                      Sign Out
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <Link to="/" className="p-2 d-flex align-items-center">
          Orders
        </Link>
        <Link to="/" className="p-2 d-flex align-items-center gap-2">
          <span className="cart-icon">
            <span className="n-of-cart-items rounded-circle">
              {numberOfCartItems > 9 ? "9+" : numberOfCartItems}
            </span>
            <i
              className="fa-solid fa-cart-shopping"
              style={{ fontSize: 25 }}
            ></i>
          </span>
          Cart
        </Link>
      </div>
      <div className="catigory-nav">
        <ul>
          <li>
            <Link>Electronics</Link>
          </li>
          <li>
            <Link>Computers</Link>
          </li>
          <li>
            <Link>Fitness</Link>
          </li>
          <li>
            <Link>Cameras</Link>
          </li>
          <li>
            <Link>Home</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

function toggleAppearance(element, options = {}) {
  if (options.show === true) {
    element.classList.remove("hidden");
    element.classList.add("show");
  } else if (options.show === false) {
    element.classList.remove("show");
    element.classList.add("hidden");
  }
}

function handleListsAppearance(className) {
  const lists = document.querySelectorAll(`.${className}`);

  lists.forEach((list) => {
    if (list.classList.contains("show")) {
      list.classList.add("transition-0");
      toggleAppearance(list, { show: false });
      setTimeout(() => list.classList.remove("transition-0"), 5);
    }
  });
}
