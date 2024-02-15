// Modules
import { useContext, useState } from "react";
import cloudinary from "../util/cloudinary";
import { Link, useNavigate } from "react-router-dom";
// Utils
import { CustomDate } from "../util/date";
import { AdvancedImage } from "@cloudinary/react";
import priceFormatter from "../util/priceFormatter";
import { pageContext } from "../util/Contexts/Page";

// CSS
import "./Order.css";

export default function Order({ order }) {
  const [selected, setIsSelected] = useState(false);

  const {
    screen: { isMobile },
  } = useContext(pageContext);

  const createdAt = new CustomDate(order.createdAt);

  const deliveryDateFrom = createdAt.getDateAfter(order.delivery_estimate[0]);

  const deliveryDateTo = createdAt.getDateAfter(order.delivery_estimate[1]);

  return (
    <div id={`${order.id} `} className="order">
      <div
        className={`order-head ${selected ? "selected" : ""}`}
        onClick={() => setIsSelected((preValue) => !preValue)}
      >
        <div className="order-head-content">
          <div className="order-head-content-first">
            <div>
              <h6>ORDER PLACED</h6>
              <p>{createdAt.toString()}</p>
            </div>
            {!isMobile && (
              <>
                <div>
                  <h6>TOTAL</h6>
                  <p>{order.total_amount}$</p>
                </div>
                <div>
                  <h6>DISPATCH TO</h6>
                  <p>{order.Address.line1}</p>
                </div>
              </>
            )}
          </div>
          <p className="order-id-con">
            ORDER #
            <span
              className={isMobile ? "overflow-scroll d-block" : ""}
              style={{ width: isMobile ? 50 : "" }}
            >
              {order.id}
            </span>
          </p>
        </div>
        <i
          className={`fa-solid ${selected ? "fa-angle-up" : "fa-angle-down"}`}
        ></i>
      </div>
      <div
        className={`order-body d-${
          selected ? "flex" : "none"
        } flex-wrap-reverse`}
      >
        <div>
          <p className="delivery-date">
            Deliver
            {deliveryDateFrom.equals(deliveryDateTo)
              ? ` In  ${deliveryDateFrom.toString()}`
              : ` From  ${deliveryDateFrom.toString()}    To    ${deliveryDateTo.toString()}`}
          </p>
          {isMobile && <p>Dispatch to {order.Address.line1}</p>}
          <div className="order-products-con">
            {order.Products.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </div>
        </div>
        <div className="amount-con">
          <p>Subtotal&ensp;{order.subtotal}$</p>
          <p>Shipping&ensp;{order.shipping_amount}$</p>
          <p>Total&ensp;{order.total_amount}$</p>
        </div>
      </div>
    </div>
  );
}

function Product({ id, image, name, price, quantity, currency }) {
  const nav = useNavigate();

  image = cloudinary.image(image);

  price = priceFormatter(price);

  return (
    <div id={id} className="d-flex gap-4 mb-4   ">
      <AdvancedImage cldImg={image} onClick={() => nav(`/product/${id}`)} />
      <div>
        <Link className="a-hover d-block mb-2" to={`/product/${id}`}>
          {name}
        </Link>
        <p className="price-sec">
          <span>{currency}</span>
          &nbsp;
          <sub>
            <span className="price">{price[0]}</span>
          </sub>
          &nbsp;
          <span>{price[1]}</span>
        </p>
        <p style={{ fontWeight: "var(--font-w-b)" }} className="m-0">
          Quantity {quantity}
        </p>
      </div>
    </div>
  );
}
