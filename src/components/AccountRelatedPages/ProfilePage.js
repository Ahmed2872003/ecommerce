import { useContext } from "react";

import { userContext } from "../../Contexts/User";

import "./ProfilePage.css";

export default function ProfilePage(props) {
  const { user } = useContext(userContext);

  return (
    <div id="profile-con">
      <div className="image-cover"></div>
      <div className="image-con gap-4 flex-md-row flex-column mb-3">
        <img
          src={require("../../images/customer.png")}
          alt="customer"
          width="200"
          height="200"
        />
        <p className="fw-bold fs-5">{user.full_name}</p>
      </div>
      <div className="info-con row justify-content-evenly">
        <div className="col">
          <div id="location">
            <p className="title">Location</p>
            <div className="info">
              <span>Country</span>
              <span>{user.country}</span>
            </div>
            <div className="info">
              <span>City</span>
              <span>{user.city}</span>
            </div>
            {user.state && (
              <div className="info">
                <span>State</span>
                <span>{user.state}</span>
              </div>
            )}
            <div className="info">
              <span>Address</span>
              <span>{user.address}</span>
            </div>
            <div className="info">
              <span>ZIP code</span>
              <span>{user.zip_code}</span>
            </div>
          </div>
        </div>
        <div className="col">
          <p className="title">Account</p>
          <div className="info">
            <span>Email</span>
            <span>{user.email}</span>
          </div>
          <div className="info">
            <span>Phone</span>
            <span>{user.phone}</span>
          </div>
          <div className="info">
            <span>Seller</span>
            <span>{user.seller ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
