// Modules
import Cookies from "js-cookie";
// Components
import Header from "./Header";

export default function MainApp() {
  let isLoggedIn = false;
  let user = {};

  const encodedData = Cookies.get("user");

  if (encodedData) {
    isLoggedIn = true;
    user = JSON.parse(encodedData);
  }

  return (
    <div id="main-app">{<Header user={user} isLoggedIn={isLoggedIn} />}</div>
  );
}
