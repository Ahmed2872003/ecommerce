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

  const paramsObj = useUpdateParamObj(location.search);

  useUpdateWindowQuery(paramsObj, location);

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
      if (!paramsObj) return;

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

function useUpdateWindowQuery(paramsObj, location) {
  useEffect(() => {
    window.history.pushState(
      {},
      "",
      location.pathname + `?${CustomQuery.stringRepOf(paramsObj)}`
    );
  }, [paramsObj]);
}

function useUpdateParamObj(params) {
  const [paramsObj, setParamsObj] = useState(null);

  useEffect(() => {
    setParamsObj((preValue) => {
      preValue = preValue || {};

      return {
        ...preValue,
        ...CustomQuery.objectRepOf(params.slice(1)),
      };
    });
  }, [params]);

  return paramsObj;
}
