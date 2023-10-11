// CSS
import "./Product.css";

// Components
import GenStars from "./genStars";
// Modules
import { AdvancedImage } from "@cloudinary/react";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import cloudinary from "../util/cloudinary";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Product({
  id,
  currency,
  image: imgURL,
  name,
  price,
  rating,
  reviewsCount,
}) {
  const navigate = useNavigate();

  const productImg = cloudinary.image(imgURL);

  productImg.resize(Resize.scale(223));

  price = (price * 1.0).toFixed(2).split(".");

  return (
    <div className="product" onClick={(e) => navigate(`/product/${id}`)}>
      <div className="img-cover">
        <AdvancedImage cldImg={productImg} alt={name} />
      </div>
      <div className="detail-sec">
        <p className="name">{name}</p>
        <span className="rating-sec">
          <GenStars rating={rating} />
          &nbsp;
          <span>{`(${reviewsCount})`}</span>
        </span>
        <p className="price-sec">
          <span>{currency}</span>
          &nbsp;
          <sub>
            <span className="price">{price[0]}</span>
          </sub>
          &nbsp;
          <span>{price[1]}</span>
        </p>
      </div>
    </div>
  );
}
