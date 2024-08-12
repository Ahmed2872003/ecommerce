// Modules
import { useContext, useEffect, useState } from "react";
import { Route, useLocation } from "react-router-dom";
// Components
import Header from "./HeaderSection/Header";
import Footer from "./Footer";
import Home from "./Home";
import ProductPage from "./ProductPage/ProductPage";
import Spinner from "./Spinner";
import AlertMsg from "./AlertMsg";
import Cart from "./Cart";
import SuccessPayment from "./SuccessPayment";
import OrderPage from "./OrderPage/OrderPage";
import FilterProductsPage from "./FilterProductsPage/FilterProductsPage";
import AccountPage from "./AccountRelatedPages/AccountPage";
import ManageProductsPage from "./AccountRelatedPages/ManageProductsPage";
import AddProductPage from "./AccountRelatedPages/AddProductPage";
// Utils
import CustomSwitch from "../util/CustomSwitch";
import { pageContext } from "../Contexts/Page";
import { UserContextProvider } from "../Contexts/User";
import getCurrentCustomerData from "../util/getCurrentUserData";
import { cartAPI } from "../util/API/APIS";
import CustomersOrdersPage from "./AccountRelatedPages/CustomersOrdersPage";

export default function MainApp() {
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  const page = useContext(pageContext);

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
            <Route path="search" element={<FilterProductsPage />}></Route>
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

            <Route path="account" element={<AccountPage />}></Route>
            <Route
              path="account/inventory/products"
              element={<ManageProductsPage />}
            ></Route>
            <Route
              path="account/inventory/product/create"
              element={<AddProductPage />}
            ></Route>
            <Route
              path="account/customers/orders"
              element={<CustomersOrdersPage />}
            ></Route>
          </CustomSwitch>
        </main>
        <Footer />
      </div>
      <RestoreAlertMsg />
    </UserContextProvider>
  );
}

function useMergeCart(setNumberOfCartItems) {
  useEffect(() => {
    async function start() {
      const LSCart = getLSCart();

      if (getCurrentCustomerData() && LSCart.length) {
        // The user is logged in

        try {
          if (await mergetCart(LSCart)) window.localStorage.removeItem("cart");

          const { cart } = await cartAPI.get(null);

          setNumberOfCartItems(cart.Products.length);
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
      await cartAPI.post({
        productId,
        quantity,
      });
    } catch (err) {
      errs.push(err);
    }
  }
  if (errs.length) return false;

  return true;
}

const getLSCart = () => JSON.parse(window.localStorage.getItem("cart") || "[]");

function RestoreAlertMsg() {
  const page = useContext(pageContext);

  const location = useLocation();

  useEffect(() => {
    page.alertMsg.setMsg(["", ""]);
  }, [location.pathname]);
}
