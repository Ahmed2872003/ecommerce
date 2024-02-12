// Modules
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
// Components
import Header from "./Header";
import Home from "./Home";
import ProductPage from "./ProductPage";
import Spinner from "./components/Spinner";
import AlertMsg from "./components/AlertMsg";
import Cart from "./Cart";
import SuccessPayment from "./SuccessPayment";
import OrderPage from "./OrderPage";
// Utils
import CustomSwitch from "./util/CustomSwitch";
import { pageConext } from "./util/Contexts/Page";
import { UserContextProvider } from "./util/Contexts/User";
import getCurrentCustomerData from "./util/getCurrentUserData";

export default function MainApp() {
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  const page = useContext(pageConext);

  useMergeCart(setNumberOfCartItems);

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

            <Route path="orders" element={<OrderPage />}></Route>
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

function useMergeCart(setNumberOfCartItems) {
  useEffect(() => {
    async function start() {
      const LSCart = getLSCart();

      if (getCurrentCustomerData() && LSCart.length) {
        // The user is logged in
        window.localStorage.removeItem("cart");

        try {
          await mergetCart(LSCart);

          const {
            data: { data },
          } = await axios.get(axios.BASE_URL + "/cart");

          setNumberOfCartItems(data.cart.Products.length);
        } catch (err) {
          console.log(err);
        }
      }
    }

    start();
  }, []);
}

async function mergetCart(LSCart) {
  const errs = [];

  for (const [productId, quantity] of LSCart) {
    try {
      await axios.post(axios.BASE_URL + "/cart", {
        productId,
        quantity,
      });
    } catch (err) {
      errs.push(err);
    }
  }
  if (errs.length) console.log(errs);
}

const getLSCart = () => JSON.parse(window.localStorage.getItem("cart") || "[]");
