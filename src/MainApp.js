// Modules
import Cookies from "js-cookie";
import { createContext, useEffect, useRef, useState } from "react";
import { Route } from "react-router-dom";
// Components
import Header from "./Header";
import Home from "./Home";
import ProductPage from "./ProductPage";
import Spinner from "./components/Spinner";
import AlertMsg from "./components/AlertMsg";
import Cart from "./Cart";
import SuccessPayment from "./SuccessPayment";
import Order from "./Order";
// Utils
import CustomSwitch from "./util/CustomSwitch";
import { UserContextProvider } from "./util/Contexts/UserContext";

export default function MainApp() {
  let [isMobile, setMobileScreen] = useState(undefined);
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [[msgType, msgContent], setMsg] = useState(["", ""]);

  useEffect(() => {
    function handleScreenResize(e) {
      if (window.innerWidth <= 769) setMobileScreen(true);
      else setMobileScreen(false);
    }

    window.addEventListener("resize", handleScreenResize);

    handleScreenResize();

    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, []);

  return (
    <UserContextProvider>
      <div id="main-app">
        <Header
          isMobile={isMobile}
          numberOfCartItems={numberOfCartItems}
          setNumberOfCartItems={setNumberOfCartItems}
        />
        <main>
          {isLoading && <Spinner />}
          <AlertMsg msg={msgContent} type={msgType} setMsg={setMsg} top={140} />
          <CustomSwitch>
            <Route
              index
              element={
                <Home setIsLoading={setIsLoading} isLoading={isLoading} />
              }
            ></Route>
            <Route
              path="product/:id"
              element={
                <ProductPage
                  setNumberOfCartItems={setNumberOfCartItems}
                  setIsLoading={setIsLoading}
                  setMsg={setMsg}
                  isMobile={isMobile}
                />
              }
            ></Route>
            <Route
              path="cart"
              element={
                <Cart
                  setIsLoading={setIsLoading}
                  setMsg={setMsg}
                  setNumberOfCartItems={setNumberOfCartItems}
                />
              }
            ></Route>

            <Route path="orders" element={<Order />}></Route>
            <Route
              path="payment-status/success"
              element={<SuccessPayment />}
            ></Route>
          </CustomSwitch>
        </main>
      </div>
    </UserContextProvider>
  );
}
