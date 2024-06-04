// CSS
import { useEffect, useRef, useState, isValidElement } from "react";
import "./Home.css";

// Components
import Product from "./Product";
import LoadingIcons from "react-loading-icons";
import ProductLoaderCon from "./ProductLoaderCon";

// Utils
import { productAPI } from "../util/API/APIS";

export default function Home(props) {
  return <ProductLoaderCon />;
}
