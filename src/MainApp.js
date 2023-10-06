// Modules
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
// Components
import Header from "./Header";

export default function MainApp() {
  const isLoggedIn = useRef(false);
  const user = useRef({});
  let [isMobile, setMobileScreen] = useState(false);

  useEffect(() => {
    const encodedData = Cookies.get("user");

    if (encodedData) {
      isLoggedIn.current = true;
      user.current = JSON.parse(encodedData);
    }

    function handleScreenResize(e) {
      if (window.innerWidth < 768) setMobileScreen(true);
      else setMobileScreen(false);
    }

    window.addEventListener("resize", handleScreenResize);

    handleScreenResize();

    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, []);

  return (
    <div id="main-app">
      <Header
        user={user.current}
        isLoggedIn={isLoggedIn.current}
        isMobile={isMobile}
      />
    </div>
  );
}
