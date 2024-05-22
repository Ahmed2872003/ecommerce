// Modules
import { useEffect, useState, useContext } from "react";

// Utils
import { pageContext } from "../../Contexts/Page";
import { orderAPI } from "../../util/API/APIS";

// Components
import Order from "./Order";

// CSS
import "./OrderPage.css";

export default function OrderPage() {
  const ordersDetails = useGetOrders();

  return ordersDetails && ordersDetails.length ? (
    <div id="order">
      <h4 className="title">Orders</h4>
      <div id="orders-con">
        <p>Total: {ordersDetails.length}</p>
        {ordersDetails.map((order) => (
          <Order order={order} key={order.id} />
        ))}
      </div>
    </div>
  ) : (
    <p className="centered-msg">No orders found</p>
  );
}

function useGetOrders() {
  const [ordersDetails, setOrdersDetails] = useState(null);

  const page = useContext(pageContext);

  useEffect(() => {
    async function start() {
      page.loading.setLoading(true);
      try {
        const { orders } = await orderAPI.get();

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
