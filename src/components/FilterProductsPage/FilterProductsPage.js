// Modules
import { useLocation } from "react-router";
import { useState, useEffect } from "react";

// CSS
import "./FilterProductsPage.css";

export default function FilterProductsPage(props) {
  const { search: searchString } = useLocation();
  const [params, setParams] = useState({});

  useEffect(() => {
    setParams((preValue) => ({
      ...preValue,
      ...paramsToObject(searchString),
    }));
  }, [searchString]);
}

function paramsToObject(searchString) {
  const params = new URLSearchParams(searchString);

  return Object.fromEntries(params.entries());
}
