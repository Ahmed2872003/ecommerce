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

    getOrders()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return null;
}
