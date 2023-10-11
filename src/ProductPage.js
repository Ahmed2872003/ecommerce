// Modules
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import cloudinary from "./util/cloudinary";
// Components
import { AdvancedImage } from "@cloudinary/react";
import { Slide } from "react-slideshow-image";
import GenStars from "./components/genStars";

// CSS
import "./ProductPage.css";
import "react-slideshow-image/dist/styles.css";

// Modules
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductPage({ setNumberOfCartItems }) {
  const { id } = useParams();
  const [productData, setProductData] = useState({});

  useEffect(() => {
    (async () => {
      const {
        data: {
          data: { product },
        },
      } = await axios.get(axios.BASE_URL + `/product/${id}`);

      setProductData(() => {
        product.price = (product.price * 1.0).toFixed(2).split(".");
        return {
          ...product,
          images: Array(5)
            .fill(product.image)
            .map((image) => {
              const cldImg = cloudinary.image(image);
              return cldImg;
            }),
        };
      });
    })();
  }, []);

  useEffect(() => {
    console.log(productData);
  }, [productData]);

  return (
    <>
      {Object.keys(productData).length && (
        <div className="d-flex gap-4">
          <div className="slide-container">
            <Slide transitionDuration={500}>
              {productData.images.map((slideImage, index) => (
                <AdvancedImage cldImg={slideImage} />
              ))}
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
          </div>
        </div>
      )}
    </>
  );
}
