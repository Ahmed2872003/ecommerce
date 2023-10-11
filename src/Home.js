// CSS
import { useEffect, useRef, useState, isValidElement } from "react";
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

const productsLimit = 20;

export default function Home(props) {
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

      setProducts((prevData) =>
        [...prevData, ...products].map((product) => {
          const productData = isValidElement(product) ? product.props : product;

          return <Product key={productData.id} {...productData} />;
        })
      );
    })();
  }, [pageNum]);

  useEffect(() => {
    if (products.length) {
      setIsLoading(false);
      getMoreProducts.current = true;
    }
  }, [products]);

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

  return (
    <>
      <div className="product-con">
        {products.length ? products : <Spinner />}
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
