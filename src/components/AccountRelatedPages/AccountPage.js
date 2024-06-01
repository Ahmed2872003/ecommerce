import { useContext } from "react";

import { userContext } from "../../Contexts/User";
import "./AccountPage.css";

export default function AccountPage() {
  const { user } = useContext(userContext);

  return (
    <div className="account-con">
      <h4 className="title">Account</h4>
    </div>
  );
}
