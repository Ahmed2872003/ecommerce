// CSS
import "./Product.css";

//Utils
import genStars from "../util/genStars";
// Modules
import { AdvancedImage } from "@cloudinary/react";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import cloudinary from "../util/cloudinary";
import { useRef } from "react";

export default function Product({
  id,
  currency,
  image: imgURL,
  name,
  price,
  rating,
}) {
  const productImg = cloudinary.image(imgURL);

  productImg.resize(Resize.scale(223));

  const starsElements = genStars(rating);

  price = (price * 1.0).toFixed(2).split(".");

  return (
    <div className="product">
      <div className="img-cover">
        <AdvancedImage cldImg={productImg} alt={name} />
      </div>
      <div className="detail-sec">
        <p className="name">{name}</p>
        <span className="rating-sec">
          <span className="r-icons-con">{starsElements}</span>&nbsp;
          <span>{`(${rating})`}</span>
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
