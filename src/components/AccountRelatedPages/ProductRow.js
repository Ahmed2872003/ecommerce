import { useContext, useState } from "react";

import { useNavigate } from "react-router";

import { AdvancedImage } from "@cloudinary/react";

import cloudinary from "../../util/cloudinary";

import { pageContext } from "../../Contexts/Page";

import { productAPI } from "../../util/API/APIS";

import errorHandler from "../../util/errors/errorHandler";

// CSS
import "./ProductRow.css";

export default function ProductRow({
  product,
  limit,
  sellerId,
  createdProducts,
  setCreatedProducts,
  setIsPageChanging,
  pageNum,
  setpageNum,
}) {
  const nav = useNavigate();

  const page = useContext(pageContext);

  async function handleDeleteProduct(e) {
    const deleteIntent = window.confirm(
      `Are you  sure you want to delete "${product.name}"?`
    );

    if (!deleteIntent) return;

    await errorHandler(async () => {
      setIsPageChanging(true);
      // Get the next product
      const {
        products: [nextProduct],
        MatchedProductsCount,
      } = await productAPI.get({
        SellerId: { eq: sellerId },
        page: {
          eq: createdProducts.products.length + limit * (pageNum - 1) + 1,
        },
        limit: { eq: 1 },
      });

      await productAPI.deleteById(product.id);

      const newProducts = createdProducts.products.filter(
        (p) => p.id !== product.id
      );

      if (nextProduct) newProducts.push(nextProduct);

      if (!newProducts.length) setpageNum((prevPageNum) => prevPageNum - 1);
      else
        setCreatedProducts(({ MatchedProductsCount }) => ({
          products: newProducts,
          MatchedProductsCount: MatchedProductsCount - 1,
        }));

      page.alertMsg.setMsg(["success", `"${product.name}" is deleted`]);
    }, page.alertMsg.setMsg);

    setIsPageChanging(false);
  }

  return (
    <tr id="product-row" onClick={() => nav(`/product/${product.id}`)}>
      <th scope="row">{product.id}</th>
      <td id="small-img">
        <AdvancedImage
          className="w-100"
          cldImg={cloudinary.image(product.image)}
          alt={product.name}
        />
      </td>
      <td>{product.name}</td>
      <td>
        {product.createdAt.split("T")[0]}
        <br />
        <th scope="col" style={{ color: "var(--amz-grey)" }}>
          {product.updatedAt.split("T")[0]}
        </th>
      </td>
      <td className="d-none d-lg-table-cell">{product.quantity}</td>
      <td className="d-none d-lg-table-cell">
        {product.price}&nbsp;
        {product.currency}
      </td>
      <td>
        <div class="btn-group" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            class="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            data-bs-display="static"
            aria-expanded="false"
          >
            Actions
          </button>
          <ul
            class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start"
            onClick={(e) => e.currentTarget.classList.remove("show")}
          >
            <li
              onClick={(e) => {
                nav("/account/inventory/product/create", {
                  state: { product },
                });
              }}
            >
              <button class="dropdown-item btn">Edit</button>
            </li>
            <li onClick={handleDeleteProduct}>
              <button class="dropdown-item btn btn-danger">Delete</button>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
}
