// Modules
import { useEffect, useState, useContext } from "react";
import axios from "axios";

// Utils
import { pageConext } from "./util/Contexts/Page";

// Components
import Order from "./components/Order";

// CSS
import "./OrderPage.css";

export default function OrderPage() {
  const ordersDetails = useGetOrders();

  return ordersDetails && ordersDetails.length ? (
    <>
      <h4 className="title">Orders</h4>
      <div id="orders-con">
        <p>Total: {ordersDetails.length}</p>
        {ordersDetails.map((order) => (
          <Order order={order} key={order.id} />
        ))}
      </div>
    </>
  ) : (
    <p className="centered-msg">No orders found</p>
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
