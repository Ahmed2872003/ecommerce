import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { userContext } from "../../Contexts/User";
import { pageContext } from "../../Contexts/Page";

import "./AccountPage.css";

export default function AccountPage() {
  const { user } = useContext(userContext);

  const page = useContext(pageContext);

  useEffect(() => page.loading.setLoading(false), []);

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
              <Link to="/account/inventory/products" className="serv-card">
                <img
                  src={require("../../images/product.png")}
                  alt="account-service"
                />
                <div>
                  <h5>Your Inventory</h5>
                  <p>Manage Inventory</p>
                </div>
              </Link>
            </div>
          )}
        </div>

        <div className="row">
          {user.seller && (
            <div className="col">
              <Link to="/account/customers/orders" className="serv-card">
                <img
                  src={require("../../images/customer-orders.png")}
                  alt="account-service"
                />

                <div>
                  <h5>Orders</h5>
                  <p>Customers orders</p>
                </div>
              </Link>
            </div>
          )}
          <div className="col">
            <Link to="/account/inventory/products" className="serv-card">
              <span className="icon-con">
                <i class="fa-solid fa-user"></i>
              </span>

              <div>
                <h5>Profile</h5>
                <p>Personal information</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
