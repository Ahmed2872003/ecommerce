// CSS
import "./Product.css";

// Components
import Rating from "./Rating";
// Modules
import { AdvancedImage } from "@cloudinary/react";

import { useNavigate } from "react-router";

// Utils
import priceFormatter from "../util/priceFormatter";
import cloudinary from "../util/cloudinary";

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

  price = priceFormatter(price);

  return (
    <div className="product" onClick={(e) => navigate(`/product/${id}`)}>
      <div className="img-cover">
        <AdvancedImage
          cldImg={cloudinary.image(imgURL)}
          alt={name}
          loading="lazy"
        />
      </div>
      <div className="detail-sec">
        <p className="name">{name}</p>
        <span className="rating-sec">
          <Rating rating={rating} />
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
