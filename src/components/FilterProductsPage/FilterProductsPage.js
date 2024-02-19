// Modules
import { useLocation } from "react-router";
import { useState, useEffect, useContext } from "react";
import { pageContext } from "../../Contexts/Page";

// CSS
import "./FilterProductsPage.css";

// Utils
import CustomQuery from "../../util/CustomQuery";
import { productAPI } from "../../util/API/APIS";

export default function FilterProductsPage(props) {
  const location = useLocation();
  const [paramsObj, setParamsObj] = useState({});

  useEffect(() => {
    setParamsObj((preValue) => ({
      ...preValue,
      ...CustomQuery.objectRepOf(location.search.slice(1)),
    }));
  }, [location.search]);

  useUpdateSearch(paramsObj, location);

  const productsData = useGetProducts(paramsObj);

  useEffect(() => {
    console.log(productsData);
  }, [productsData]);
}

function useGetProducts(paramsObj) {
  const [productsData, setProductsData] = useState([]);
  const { loading, alertMsg } = useContext(pageContext);

  useEffect(() => {
    async function start() {
      if (!Object.keys(paramsObj).length) return;
      loading.setLoading(true);

      try {
        const { products } = await productAPI.get(paramsObj);

        setProductsData(products);
      } catch (err) {
        console.log(err.message);
        alertMsg.setMsg(["error", err.message]);
      }

      loading.setLoading(false);
    }

    start();
  }, [paramsObj]);

  return productsData;
}

function useUpdateSearch(paramsObj, location) {
  useEffect(() => {
    window.history.pushState(
      {},
      "",
      location.pathname + `?${CustomQuery.stringRepOf(paramsObj)}`
    );
  }, [paramsObj]);
}
