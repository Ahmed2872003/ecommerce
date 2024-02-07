// Modules
import Cookies from "js-cookie";
import { useContext, useState } from "react";
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
import { UserContextProvider } from "./util/Contexts/User";
import { pageConext } from "./util/Contexts/Page";

export default function MainApp() {
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  const page = useContext(pageConext);

  return (
    <UserContextProvider>
      <div id="main-app">
        <Header
          numberOfCartItems={numberOfCartItems}
          setNumberOfCartItems={setNumberOfCartItems}
        />
        <main>
          {page.loading.value && <Spinner />}
          <AlertMsg
            msg={page.alertMsg.content}
            type={page.alertMsg.type}
            setMsg={page.alertMsg.setMsg}
            top={140}
          />
          <CustomSwitch>
            <Route
              index
              element={
                <Home
                  setIsLoading={page.loading.setLoading}
                  isLoading={page.loading.value}
                />
              }
            ></Route>
            <Route
              path="product/:id"
              element={
                <ProductPage
                  setNumberOfCartItems={setNumberOfCartItems}
                  setIsLoading={page.loading.setLoading}
                  setMsg={page.alertMsg.setMsg}
                />
              }
            ></Route>
            <Route
              path="cart"
              element={
                <Cart
                  setIsLoading={page.loading.setLoading}
                  setMsg={page.alertMsg.setMsg}
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
