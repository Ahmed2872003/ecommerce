import { useEffect, useState, useRef, useContext } from "react";

import { pageContext } from "../Contexts/Page";
import Product from "./Product";
import LoadingIcons from "react-loading-icons";

import productAPI from "../util/API/product";

const productsLimit = 20;

export default function ProductLoaderCon(props) {
  const [pageNum, setPageNum] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterChanged, setFilterChanged] = useState(false);

  let getMoreProducts = useRef(true);

  const page = useContext(pageContext);

  // useEffect
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

  useEffect(() => {
    setProducts([]);
    setPageNum(1);
    setFilterChanged(true);
    getMoreProducts.current = true;
  }, [props.filters]);

  useEffect(() => {
    (async () => {
      if (!filterChanged && pageNum === 1) return;

      console.log(pageNum);

      if (!isLoading) page.loading.setLoading(true);

      try {
        const { products, MatchedProductsCount } = await productAPI.get({
          page: { eq: pageNum },
          limit: { eq: productsLimit },
          ...props.filters,
        });

        if (props.setResCount) props.setResCount(MatchedProductsCount);

        if (products.length) {
          setProducts((prevData) => {
            return [...prevData, ...products];
          });

          getMoreProducts.current = true;
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);

      setFilterChanged(false);
      if (!isLoading) page.loading.setLoading(false);
    })();
  }, [pageNum, filterChanged]);

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
