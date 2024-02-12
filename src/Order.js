// CSS
import { useEffect, useState, useContext } from "react";
import "./Order.css";
import axios from "axios";

// Utils
import { pageConext } from "./util/Contexts/Page";
import { constructDateObj, getDateAfter } from "./util/date";

export default function Order() {
  const ordersDetails = useGetOrders();

  return ordersDetails && ordersDetails.length ? (
    <div id="orders-con">
      <h4 className="title">Orders</h4>
      {ordersDetails.map((order) => (
        <OrderStructure order={order} key={order.id} />
      ))}
    </div>
  ) : (
    <p className="centered-msg">No orders found</p>
  );
}

function OrderStructure({ order }) {
  const [selected, setIsSelected] = useState(false);

  const dateObj = constructDateObj(order.createdAt);

  return (
    <div id={`${order.id} `} className="order">
      <div
        className={`order-head ${selected && "selected"}`}
        onClick={() => setIsSelected((preValue) => !preValue)}
      >
        <div>
          <p className="m-0">{order.id}</p>
          <p className="order-date m-0">
            {dateObj.month.name} {dateObj.day.numberInMonth}, {dateObj.year}
          </p>
        </div>
        <i
          className={`fa-solid ${selected ? "fa-angle-up" : "fa-angle-down"}`}
        ></i>
      </div>
      <div className={`order-body d-${selected ? "block" : "none"}`}></div>
    </div>
  );
}

function useGetOrders() {
  const [ordersDetails, setOrdersDetails] = useState(null);

  const page = useContext(pageConext);

  useEffect(() => {
    async function start() {
      page.loading.setLoading(true);
      try {
        const orders = await getOrders();

        console.log(orders);

        setOrdersDetails(orders);
      } catch (err) {
        console.log(err);
      }
      page.loading.setLoading(false);
    }

    start();
  }, []);

  return ordersDetails;
}

async function getOrders() {
  const {
    data: {
      data: { orders },
    },
  } = await axios.get(axios.BASE_URL + "/order");

  return orders;
}
