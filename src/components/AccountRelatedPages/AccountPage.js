import { useContext } from "react";

import { Link } from "react-router-dom";

import { userContext } from "../../Contexts/User";
import "./AccountPage.css";

export default function AccountPage() {
  const { user } = useContext(userContext);

  console.log(user);

  return (
    <div className="account-con">
      <h4 className="title">Account</h4>
      <div className="account-serv-cards-con container">
        <div className="row">
          <div className="col">
            <Link to="/orders" className="serv-card">
              <img
                src={require("../../images/order.png")}
                alt="account-service"
              />
              <div>
                <h5>Your Orders</h5>
                <p>Orders details</p>
              </div>
            </Link>
          </div>
          <div className="col">
            <Link to="" className="serv-card">
              <img
                src={require("../../images/security.png")}
                alt="account-service"
              />
              <div>
                <h5>Login & Security</h5>
                <p>
                  Manage password, email, mobile number, and security settings
                </p>
              </div>
            </Link>
          </div>
          {user.seller && (
            <div className="col">
              <Link to="/account/products" className="serv-card">
                <img
                  src={require("../../images/product.png")}
                  alt="account-service"
                />
                <div>
                  <h5>Your Products</h5>
                  <p>Manage Products</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
