// CSS
import { useEffect, useRef, useState } from "react";
import "./Home.css";
import Spinner from "./components/Spinner";
// Modules
import axios from "axios";

// Components
import Product from "./components/Product";
import LoadingIcons from "react-loading-icons";

async function getProducts(page, limit) {
  const {
    data: { data },
  } = await axios.get(axios.BASE_URL + `/product?page=${page}&limit=${limit}`);

  return data;
}

export default function Home(props) {
  const [productsLimit, setProductsLimit] = useState(20);
  const [pageNum, setPageNum] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let getMoreProducts = useRef(true);

  useEffect(() => {
    (async () => {
      const { products, length } = await getProducts(pageNum, productsLimit);

      if (!length) {
        setIsLoading(false);
        return;
      }

      setProducts((prevData) => [...prevData, ...products]);
      setIsLoading(false);
      getMoreProducts.current = true;
    })();
  }, [pageNum, productsLimit]);

  useEffect(() => {
    function handleScroll() {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;
      const modifier = 20;

      if (
        Math.ceil(currentScroll) + modifier >= documentHeight &&
        getMoreProducts.current
      ) {
        getMoreProducts.current = false;
        setIsLoading(true);
        setPageNum((prevPage) => prevPage + 1);
      }
    }
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let productElements = products.map((productData) => (
    <Product {...productData} key={productData.id} />
  ));

  return (
    <>
      <div className="product-con">
        {products.length ? productElements : <Spinner />}
      </div>
      {isLoading && (
        <LoadingIcons.Puff
          stroke="var(--amz-yellow)"
          style={{ margin: "auto", display: "block" }}
        />
      )}
    </>
  );
}
