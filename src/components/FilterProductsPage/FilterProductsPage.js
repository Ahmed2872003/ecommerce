// Modules
import { useLocation } from "react-router";
import { useState, useEffect, useContext, useRef } from "react";
import { pageContext } from "../../Contexts/Page";
import Product from "../Product";

// CSS
import "./FilterProductsPage.css";

// Utils
import CustomQuery from "../../util/CustomQuery";
import { productAPI } from "../../util/API/APIS";
import ProductLoaderCon from "../ProductLoaderCon";

export default function FilterProductsPage(props) {
  const location = useLocation();

  const [resCount, setResCount] = useState(0);

  const paramsObj = useUpdateParamObj(location.search);

  useUpdateWindowQuery(paramsObj, location);

  return (
    <>
      <h6 id="res-con">
        {resCount > 100 ? "Over 100" : resCount} results for
        <span> "{paramsObj && paramsObj.name?.like}"</span>
      </h6>
      {paramsObj && (
        <ProductLoaderCon filters={paramsObj} setResCount={setResCount} />
      )}
    </>
  );
}

function useUpdateWindowQuery(paramsObj, location) {
  useEffect(() => {
    window.history.pushState(
      {},
      "",
      "search" + `?${CustomQuery.stringRepOf(paramsObj)}`
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
