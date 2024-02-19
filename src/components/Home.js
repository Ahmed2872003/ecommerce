// CSS
import { useEffect, useRef, useState, isValidElement } from "react";
import "./Home.css";
// Modules

// Components
import Product from "./Product";
import LoadingIcons from "react-loading-icons";

// Utils
import CustomQuery from "../util/CustomQuery";
import { productAPI } from "../util/API/APIS";

const productsLimit = 20;

export default function Home(props) {
  const [pageNum, setPageNum] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let getMoreProducts = useRef(true);

  // useEffect

  useEffect(() => {
    (async () => {
      if (!isLoading) props.setIsLoading(true);
      try {
        const { products } = await productAPI.get({
          page: { eq: pageNum },
          limit: { eq: productsLimit },
        });

        if (products.length)
          setProducts((prevData) => {
            return [...prevData, ...products];
          });
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
      if (!isLoading) props.setIsLoading(false);
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

  // handle function

  return (
    <>
      <div className="product-con">
        {products.map((productData) => (
          <Product key={productData.id} {...productData} />
        ))}
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
