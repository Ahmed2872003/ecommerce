// Modules
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
// Components
import Header from "./Header";

export default function MainApp() {
  const [isLoggedIn, setLogIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const encodedData = Cookies.get("user");
    if (encodedData) {
      setLogIn(true);
      setUser(JSON.parse(encodedData));
    }
  }, []);

  return (
    <div id="main-app">{<Header user={user} isLoggedIn={isLoggedIn} />}</div>
  );
}
