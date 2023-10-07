// CSS
import { useEffect, useRef, useState } from "react";
import "./Home.css";
import Spinner from "./components/Spinner";
// Modules
import axios from "axios";

// Components
import Product from "./components/Product";

async function getProducts(page, limit) {
  const {
    data: { data },
  } = await axios.get(axios.BASE_URL + `/product?page=${page}&limit=${limit}`);

  return data;
}

export default function Home(props) {
  const [productsLimit, setProductsLimit] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const { products, length } = await getProducts(pageNum, productsLimit);
      console.log(products);
      setProducts((prevData) => [...prevData, ...products]);
    })();
  }, [pageNum, productsLimit]);

  let productElements = products.map((productData) => (
    <Product {...productData} key={productData.id} />
  ));

  return (
    <div className="product-con">
      {products.length ? productElements : <Spinner />}
    </div>
  );
}
