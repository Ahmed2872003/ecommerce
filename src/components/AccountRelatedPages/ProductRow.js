import { useNavigate } from "react-router";

import { AdvancedImage } from "@cloudinary/react";

import cloudinary from "../../util/cloudinary";

// CSS
import "./ProductRow.css";

export default function ProductRow({ product }) {
  const nav = useNavigate();
  console.log(product);
  return (
    <tr id="product-row" onClick={() => nav(`/product/${product.id}`)}>
      <th scope="row">{product.id}</th>
      <td id="small-img">
        <AdvancedImage
          cldImg={cloudinary.image(product.image)}
          alt={product.name}
        />
      </td>
      <td>{product.name}</td>
      <td>
        {product.createdAt}
        <br />{" "}
        <th scope="col" style={{ color: "var(--amz-grey)" }}>
          {product.updatedAt}
        </th>
      </td>
      <td>{product.quantity}</td>
      <td>
        {product.price}&nbsp;
        {product.currency}
      </td>
      <td>
        <div className="btn-group">
          <button
            type="button"
            class="btn btn-light"
            onClick={(e) => e.stopPropagation()}
          >
            Edit
          </button>
          <button
            type="button"
            class="btn btn-danger"
            onClick={(e) => e.stopPropagation()}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
