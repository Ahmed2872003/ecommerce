// CSS
import { useEffect } from "react";
import "./Order.css";
import axios from "axios";

export default function Order() {
  useEffect(() => {
    async function getOrders() {
      const {
        data: {
          data: { orders },
        },
      } = await axios.get(axios.BASE_URL + "/order");

      return orders;
    }

    async function start() {
      try {
        const orders = await getOrders();

        console.log(orders);
      } catch (err) {
        console.log(err);
      }
    }

    start();
  }, []);

  return null;
}
