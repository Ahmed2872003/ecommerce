// Modules
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useContext } from "react";
// Utils
import { userContext } from "./util/Contexts/User";
import { pageContext } from "./util/Contexts/Page";
// CSS
import "./Header.css";
import axios from "axios";

export default function Header({ numberOfCartItems, setNumberOfCartItems }) {
  const navigate = useNavigate();
  const timeoutId = useRef(0);
  const tempAuthNav = useRef();
  const { user, isLoggedIn } = useContext(userContext);
  const {
    screen: { isMobile },
  } = useContext(pageContext);

  function tempAuthNavMouseLeave(e) {
    if (e) e.stopPropagation();
    timeoutId.current = setTimeout(() => {
      toggleAppearance(tempAuthNav.current, { show: false });
    }, 1000 * 10);
  }

  function tempAuthNavMouseEnter(e) {
    clearTimeout(timeoutId.current);
  }

  useEffect(() => {
    if (!isLoggedIn) {
      toggleAppearance(tempAuthNav.current, { show: true });
      tempAuthNavMouseLeave();
    } else {
      hideAllLists("nav-list");
    }

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    function handleDocClickEvent(e) {
      hideAllLists("nav-list");
    }

    document.addEventListener("click", handleDocClickEvent);
    return () => {
      document.removeEventListener("click", handleDocClickEvent);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      if (window.location.pathname === "/payment-status/success") {
        setNumberOfCartItems(0);
        return;
      }

      axios
        .get(axios.BASE_URL + "/cart")
        .then((res) => {
          const {
            data: {
              data: {
                cart: { Products },
              },
            },
          } = res;

          setNumberOfCartItems(Products.length);
        })
        .catch((err) => console.log(err.response));
    } else {
      const LSCart = JSON.parse(window.localStorage.getItem("cart") || "[]");

      setNumberOfCartItems(LSCart.length);
    }
  }, []);

  return (
    <header id="main-header">
      <div>
        <Link to="/" className="p-2 d-flex align-items-center logo">
          <img
            src={require("./images/amz-white-logo.png")}
            alt="amz-logo"
            width="80"
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
          <input placeholder="Search Amazon" type="text" name="name" />
          <button type="submit" className="hover-yellow">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <div
          className="drop-list p-2 nav-list"
          onClick={(e) => {
            e.stopPropagation();

            return isLoggedIn
              ? isMobile
                ? toggleAppearance(document.querySelector(".list"))
                : ""
              : navigate("/auth/login");
          }}
          onMouseEnter={(e) => {
            if (!e.target.classList.contains("temp-auth-nav") && !isMobile) {
              hideAllLists("nav-list");
              toggleAppearance(document.querySelector(".list"), { show: true });
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile)
              toggleAppearance(document.querySelector(".list"), {
                show: false,
              });
          }}
        >
          <p>Hello, {isLoggedIn ? user.first_name : "sign in"}</p>
          <p>
            Account & Lists <i className="fa-solid fa-caret-down"></i>
          </p>
          <div
            className="auth-nav temp-auth-nav p-3 border rounded nav-list hidden"
            onClick={(e) => e.stopPropagation()}
            onMouseLeave={tempAuthNavMouseLeave}
            onMouseEnter={tempAuthNavMouseEnter}
            ref={tempAuthNav}
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
                  <Link to={isLoggedIn ? "/" : "/auth/login"}>
                    Your Account
                  </Link>
                </li>
                <li>
                  <Link to={isLoggedIn ? "/orders" : "/auth/login"}>
                    Your Orders
                  </Link>
                </li>
                <li>
                  <Link to={isLoggedIn ? "/" : "/auth/login"}>
                    Your Addresses
                  </Link>
                </li>
                <li>
                  <Link to={isLoggedIn ? "/" : "/auth/login"}>Your Lists</Link>
                </li>
                <li>
                  <Link to={isLoggedIn ? "/" : "/auth/login"}>
                    Your Recommendations
                  </Link>
                </li>
                <li>
                  <Link to={isLoggedIn ? "/" : "/auth/login"}>
                    Your Prime Membership
                  </Link>
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
        <Link
          to={isLoggedIn ? "/orders" : "/auth/login"}
          className="p-2 d-flex align-items-center"
        >
          Orders
        </Link>
        <Link
          to="cart"
          className="p-2 d-flex align-items-center gap-2 cart-nav"
        >
          <span className="cart-icon">
            <span className="n-of-cart-items rounded-circle">
              {numberOfCartItems > 9 ? "9+" : numberOfCartItems}
            </span>
            <i
              className="fa-solid fa-cart-shopping"
              style={{ fontSize: 25 }}
            ></i>
          </span>
          <span>Cart</span>
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
  switch (options.show) {
    case true:
      element.classList.remove("hidden");
      element.classList.add("show");
      break;
    case false:
      element.classList.remove("show");
      element.classList.add("hidden");
      break;
    default: {
      if (element.classList.contains("hidden")) {
        element.classList.remove("hidden");
        element.classList.add("show");
      } else if (element.classList.contains("show")) {
        element.classList.remove("show");
        element.classList.add("hidden");
      }
    }
  }
}

function hideAllLists(className) {
  const lists = document.querySelectorAll(`.${className}`);

  lists.forEach((list) => {
    if (list.classList.contains("show")) {
      list.classList.add("transition-0");
      toggleAppearance(list, { show: false });
      setTimeout(() => list.classList.remove("transition-0"), 5);
    }
  });
}
