// Modules
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
// Components
import FiltersForm from "./FiltersForm";

// CSS
import "./FilterProductsPage.css";

// Utils
import CustomQuery from "../../util/CustomQuery";
import ProductLoaderCon from "../ProductLoaderCon";

export default function FilterProductsPage(props) {
  const location = useLocation();

  const [resCount, setResCount] = useState(0);

  const [paramsObj, setParamsObj] = useUpdateParamObj(location.search);

  useUpdateWindowQuery(paramsObj, location);

  return (
    <>
      <h6 id="items-count-con">
        {resCount > 100 ? "Over 100" : resCount} results for
        <span> "{paramsObj && paramsObj.name?.like}"</span>
      </h6>
      <div id="res-con">
        <FiltersForm setFilters={setParamsObj} filters={paramsObj} />

        <div className="searched-items">
          {paramsObj && (
            <ProductLoaderCon filters={paramsObj} setResCount={setResCount} />
          )}
        </div>
      </div>
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

  return [paramsObj, setParamsObj];
}
