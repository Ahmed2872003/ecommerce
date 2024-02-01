// Modules
import { useContext, useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";

import axios from "axios";
// Utils
import { userContext } from "./util/Contexts/UserContext";
// Components
import { Link } from "react-router-dom";
// CSS
import "./Cart.css";
import { AdvancedImage } from "@cloudinary/react";
import cloudinary from "./util/cloudinary";

export default function Cart(props) {
  // useContext
  const { user } = useContext(userContext);
  // useState
  const [cartDetails, setCartDetails] = useState(null);
  const [isCartChanging, setIsCartChanging] = useState(false);

  // useEffect
  useEffect(() => {
    async function getUserCart() {
      props.setIsLoading(true);
      const {
        data: {
          data: { cart },
        },
      } = await axios.get(axios.BASE_URL + "/cart");

      return cart;
    }

    getUserCart()
      .then((res) => {
        console.log(res);
        setCartDetails(res);
      })
      .catch((err) => console.log(err))
      .finally(() => props.setIsLoading(false));
  }, []);

  // handling functions
  async function handleDeleteCartItem(e) {
    setIsCartChanging(true);

    const productId = e.target.getAttribute("itemId");

    try {
      const {
        data: {
          data: { subtotal },
        },
      } = await axios.delete(axios.BASE_URL + `/cart/item/${productId}`);

      setCartDetails((preValue) => ({ ...preValue, subtotal }));

      document.getElementById(`product${productId}`).remove();

      if (subtotal === 0) setCartDetails(null);

      props.setNumberOfCartItems((preValue) => preValue - 1);
    } catch (err) {
      console.log(err.response);
    }
    setIsCartChanging(false);
  }

  async function handleChangeItemQuantity(e) {
    setIsCartChanging(true);

    const productId = e.target.getAttribute("itemId");
    const quantity = e.target.value;

    const body = { productId, quantity };

    try {
      const {
        data: {
          data: { cart },
        },
      } = await axios.patch(axios.BASE_URL + "/cart", body);

      setCartDetails(cart);
    } catch (err) {
      console.log(err.response);
    }
    setIsCartChanging(false);
  }

  async function hadleProceedToPay(e) {
    setIsCartChanging(true);
    try {
      const {
        data: {
          data: { url },
        },
      } = await axios.post(
        axios.BASE_URL + "/stripe/create-checkout-session?buyNow=0",
        {
          products: cartDetails.Products,
        }
      );

      window.open(url, "_self");
    } catch (err) {
      setIsCartChanging(false);
      props.setMsg(["error", "There is an error please try again later."]);
      console.log(err);
    }
  }

  return cartDetails && cartDetails.Products.length ? (
    <div id="cart">
      {isCartChanging && <div className="cover-con"></div>}
      <h4>
        <strong>Cart</strong>
      </h4>
      <div
        id="cart-con"
        style={{ opacity: isCartChanging ? 0.7 : 1 }}
        className="d-flex justify-content-between gap-5"
      >
        <div id="cart-items" className="flex-grow-1">
          <div className="d-flex justify-content-between p-1">
            <p style={{ color: "var(--amz-grey)" }} className="m-0">
              Item
            </p>
            <p style={{ color: "var(--amz-grey)" }} className="m-0">
              Price
            </p>
          </div>
          <hr className="mt-0 mb-5" />
          {cartDetails.Products.map((productData, index) => (
            <div
              className=" item d-flex justify-content-between"
              key={index}
              id={`product${productData.id}`}
            >
              <div className="d-flex gap-3">
                <Link to={`/product/${productData.id}`} key={index}>
                  <AdvancedImage
                    cldImg={cloudinary.image(productData.image)}
                    width="223"
                  />
                </Link>
                <div className="item-details d-flex flex-column justify-content-between">
                  <Link
                    to={`/product/${productData.id}`}
                    className="a-hover d-block mb-3"
                  >
                    {productData.name}
                  </Link>
                  <div>
                    <label for="quantity">Quantity</label>
                    <select
                      defaultValue={productData.neededQuantity}
                      id="quantity"
                      itemId={productData.id}
                      onChange={handleChangeItemQuantity}
                    >
                      {Array(productData.quantity)
                        .fill(0)
                        .map((item, ind) => (
                          <option value={ind + 1} key={ind}>
                            {ind + 1}
                          </option>
                        ))}
                    </select>
                  </div>

                  <i
                    className="fa-solid fa-trash delete-item-btn"
                    itemId={productData.id}
                    onClick={handleDeleteCartItem}
                  ></i>
                </div>
              </div>
              <p>{productData.price}$</p>
            </div>
          ))}
        </div>
        <div>
          <button
            className="hover-yellow rounded align-self-start p-2"
            onClick={hadleProceedToPay}
          >
            proceed to pay
          </button>
          {cartDetails && (
            <p
              style={{
                color: "var(--amz-grey)",
                textAlign: "center",
                margin: "15px 0",
              }}
            >
              <strong>Subtotal: {cartDetails.subtotal}$</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <p
      style={{
        color: "var(--amz-grey)",
        fontSize: "1.5rem",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <strong>No items have been added yet</strong>
    </p>
  );
}
