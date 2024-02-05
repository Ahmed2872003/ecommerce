// Modules
import { useEffect, useRef, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import cloudinary from "./util/cloudinary";
import axios from "axios";
import ReactDOMServer from "react-dom/server";
// Components
import { AdvancedImage } from "@cloudinary/react";
import { Slide } from "react-slideshow-image";
import GenStars from "./components/genStars";
import Slider from "./components/Slider";
import Product from "./components/Product";
import ReviewsSection from "./components/ProductPage/ReviewsSection";
import { Link } from "react-router-dom";

// CSS
import "./ProductPage.css";
import "./Home.css";
import "react-slideshow-image/dist/styles.css";

// Utils
import priceFormatter from "./util/priceFormatter";
import convertToQuery from "./util/convertToQuery";
import LoadingIcons from "react-loading-icons";
import { userContext } from "./util/Contexts/UserContext";

export default function ProductPage(props) {
  const nav = useNavigate();
  // useParams
  const { id } = useParams();
  // useState
  const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [isOwnProduct, setIsOwnProduct] = useState(false);

  // useRef
  const isAvailable = useRef(false);
  const quantityInput = useRef(null);
  const numOfLoadedProducts = useRef(5);
  const btnLoading = useRef(
    <LoadingIcons.TailSpin
      width={15}
      height={15}
      stroke="black"
      style={{ margin: 0, padding: 0 }}
    ></LoadingIcons.TailSpin>
  );

  // useContext
  const { user, isLoggedIn } = useContext(userContext);

  // useEffect
  useEffect(() => {
    props.setIsLoading(true);
    (async () => {
      try {
        const product = await getProduct(id);

        isAvailable.current = product.quantity > 0;

        setIsOwnProduct(isLoggedIn && product.Seller.id === user.id);

        setProductData(() => {
          product.price = priceFormatter(product.price);
          return product;
        });
      } catch (err) {
        console.log(err);
        props.setIsLoading(false);
      }
    })();

    return () => {
      props.setMsg(["", ""]);
    };
  }, [id]);

  useEffect(() => {
    if (!productData) return;

    (async () => {
      try {
        const products = await getRelatedProducts();
        setRelatedProducts(products);
      } catch (err) {
        console.log(err);
      }
      props.setIsLoading(false);
    })();
  }, [productData]);

  // handling functions
  async function handleAddToCart(e) {
    if (!isLoggedIn) {
      handleAddToCartNoAccount(e);
      return;
    }
    const btnText = e.target.innerText;

    try {
      e.target.innerHTML = ReactDOMServer.renderToString(btnLoading.current);

      await axios.post(axios.BASE_URL + "/cart", {
        productId: id,
        quantity: quantityInput.current.value,
      });

      props.setNumberOfCartItems((prevNumber) => prevNumber + 1);
      props.setMsg(["success", "Added to cart successfully"]);
    } catch (err) {
      const errResponse = err.response;
      if (errResponse.data) {
        if (errResponse.status === 409)
          props.setMsg([
            "error",
            "This item has been already added to the cart",
          ]);
      }
    }
    e.target.innerText = btnText;
  }

  function handleAddToCartNoAccount(e) {
    const neededQuantity = +quantityInput.current.value;

    const currentCart = JSON.parse(window.localStorage.getItem("cart") || "[]");

    const currentCartMap = new Map(currentCart);

    if (!currentCartMap.has(id)) {
      currentCartMap.set(id, neededQuantity);

      props.setMsg(["success", "Added to cart successfully"]);
      props.setNumberOfCartItems((prevNumber) => prevNumber + 1);
    } else
      props.setMsg(["error", "This item has been already added to the cart"]);

    window.localStorage.setItem(
      "cart",
      JSON.stringify(Array.from(currentCartMap.entries()))
    );
  }

  async function getRelatedProducts(offset) {
    try {
      const query = convertToQuery({
        category: { like: productData.category },
        brand: { like: productData.brand },
        id: { ne: id },
        limit: { eq: numOfLoadedProducts.current },
        offset: { eq: offset },
      });
      const {
        data: {
          data: { products },
        },
      } = await axios.get(axios.BASE_URL + "/product?" + query);

      return products;
    } catch (err) {
      console.log(err);
    }
  }

  async function getProduct(id) {
    const {
      data: {
        data: { product },
      },
    } = await axios.get(axios.BASE_URL + `/product/${id}`);

    return product;
  }

  return (
    <>
      {productData && (
        <div id="productPage" key={productData.id}>
          <div className="d-flex gap-4">
            <div className="slide-container">
              <Slide transitionDuration={500} key={productData.id}>
                {productData.images.map((imgUrl, index) => {
                  const imageObj = cloudinary.image(imgUrl);

                  return (
                    <AdvancedImage
                      cldImg={imageObj}
                      alt={productData.name}
                      key={index + 1}
                    />
                  );
                })}
              </Slide>
            </div>
            <div id="product-detail">
              <p id="product-name">{productData.name}</p>
              <p>
                <span>{productData.rating}</span>&nbsp;
                <span>
                  <GenStars rating={productData.rating} />
                </span>
                &emsp;
                <Link id="review-nav" className="a-hover">
                  {productData.reviewsCount} ratings
                </Link>
              </p>
              <hr />
              <p>
                <span>{productData.currency}</span>
                <sub>
                  <span className="price">{productData.price[0]}</span>
                </sub>
                <span>{[productData.price[1]]}</span>
              </p>
              <hr />
              <div className="mt-5 mb-5">
                <p>
                  <strong>Description: </strong>
                  {productData.description}
                </p>
                <p>
                  <strong>Brand: </strong>
                  {productData.brand}
                </p>
                <p>
                  <strong>Category: </strong>
                  {productData.category}
                </p>
              </div>
              <hr />
              <div className="mt-5 mb-5">
                <h5>
                  <strong>Seller info</strong>
                </h5>
                <p>
                  <strong>Name: </strong> {productData.Seller.first_name}
                </p>
                <p>
                  <strong>Email: </strong>
                  <Link
                    to={"mailto:" + productData.Seller.email}
                    className="text-decoration-underline"
                  >
                    {productData.Seller.email}
                  </Link>
                </p>
              </div>
            </div>
            <div id="addProductCon">
              <p>
                <span>{productData.currency}</span>
                <sub>
                  <span className="price">{productData.price[0]}</span>
                </sub>
                <span>{[productData.price[1]]}</span>
              </p>
              <p>
                Delivery within two days <br />
                or faster delivery within one day
              </p>
              <p
                className={`${
                  isAvailable.current ? "text-success" : "text-danger"
                }`}
                style={{ fontWeight: "var(--font-w-b)" }}
              >
                {isAvailable.current ? "Available" : "Not available"}
              </p>
              {isAvailable.current && (
                <div id="addProduct">
                  <select name="chQuantity" ref={quantityInput}>
                    {Array(productData.quantity)
                      .fill(0)
                      .map((item, ind) => (
                        <option value={ind + 1} key={ind + 1}>
                          {ind + 1}
                        </option>
                      ))}
                  </select>
                  <div id="btns">
                    <button
                      className="reg-btn"
                      id="addToCart-btn"
                      onClick={handleAddToCart}
                      disabled={isOwnProduct ? true : false}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <hr />
          {relatedProducts.length > 0 && (
            <>
              <div id="relative-products-con">
                <h4>
                  <strong>Related products</strong>
                </h4>
                <Slider
                  key={productData.id}
                  isMobile={props.isMobile}
                  getRelatedItems={getRelatedProducts}
                  setRelatedItems={setRelatedProducts}
                >
                  {Array(relatedProducts.length)
                    .fill(0)
                    .map((item, index) => (
                      <Product
                        {...relatedProducts[index]}
                        key={relatedProducts[index].id}
                      ></Product>
                    ))}
                </Slider>
              </div>
              <hr />
            </>
          )}
          <ReviewsSection
            productData={productData}
            setProductData={setProductData}
            setRelated
            getProduct={getProduct}
            setMsg={props.setMsg}
            btnLoading={btnLoading}
          />
        </div>
      )}
    </>
  );
}
