import { useContext, useEffect, useState } from "react";
import Order from "../OrderPage/Order";
import errorHandler from "../../util/errors/errorHandler";
import { pageContext } from "../../Contexts/Page";
import orderAPI from "../../util/API/orderAPI";

export default function CustomersOrdersPage(props) {
  const [isThereError, setIsThereError] = useState(false);

  const ordersDetails = useGetOrders(setIsThereError);

  if (isThereError) return null;

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

function useGetOrders(setIsThereError) {
  const [ordersDetails, setOrdersDetails] = useState(null);

  const page = useContext(pageContext);

  useEffect(() => {
    async function start() {
      page.loading.setLoading(true);

      const isThereError = await errorHandler(async () => {
        const { orders } = await orderAPI.get("/incoming");

        setOrdersDetails(orders);
      }, page.alertMsg.setMsg);

      setIsThereError(isThereError);

      page.loading.setLoading(false);
    }

    start();
  }, []);

  return ordersDetails;
}
