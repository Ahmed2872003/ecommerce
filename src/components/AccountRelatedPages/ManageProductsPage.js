import { createElement, useContext, useEffect, useState } from "react";

import { userContext } from "../../Contexts/User";

import { pageContext } from "../../Contexts/Page";

import { productAPI } from "../../util/API/APIS";

import ProductRow from "./ProductRow";

import "./ManageProductsPage.css";

const limit = 5;

export default function ManageProductsPage() {
  const { user } = useContext(userContext);

  const [page, setPage] = useState(1);

  const [isPageChanging, setIsPageChanging] = useState(false);

  const createdProducts = useGetCreatedProducts(user.id, page);

  const productRows =
    createdProducts &&
    createdProducts.products.map((p) => <ProductRow product={p} />);

  const pagesNum =
    createdProducts &&
    calcPagesNum(createdProducts.MatchedProductsCount, limit);

  const pagesNumOptions =
    pagesNum &&
    Array(pagesNum)
      .fill(null)
      .map((e, ind) => <option value={ind + 1}>{ind + 1}</option>);

  useEffect(() => {
    setIsPageChanging(false);
  }, [createdProducts]);

  function handlePageChange(e) {
    setIsPageChanging(true);

    setPage(e.target.value);
  }

  return (
    createdProducts &&
    (createdProducts.MatchedProductsCount === 0 ? (
      <p className="centered-msg">No products have been added yet</p>
    ) : (
      <div id="inventory-con">
        <h4 className="title">Manage Inventory</h4>
        <p style={{ color: "var(--amz-grey)" }}>
          <b>{createdProducts.MatchedProductsCount} Product(s)</b>
        </p>
        <table id="products-table" className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">
                Date Created
                <th scope="col" style={{ color: "var(--amz-grey)" }}>
                  Date Updated
                </th>
              </th>
              <th scope="col">Available</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>{productRows}</tbody>
        </table>
        <label>Page</label>
        <select
          defaultValue={1}
          onChange={handlePageChange}
          disabled={isPageChanging}
        >
          {pagesNumOptions}
        </select>
      </div>
    ))
  );
}

function useGetCreatedProducts(sellerId, pageNum) {
  const [createdProducts, setCreatedProducts] = useState(null);

  const page = useContext(pageContext);

  useEffect(() => {
    page.loading.setLoading(true);

    productAPI
      .get({
        SellerId: { eq: sellerId },
        page: { eq: pageNum },
        limit: { eq: limit },
      })
      .then((products) => setCreatedProducts(products))
      .finally(() => page.loading.setLoading(false));
  }, [pageNum]);

  return createdProducts;
}

function calcPagesNum(count, limit) {
  return Math.floor(count / limit) + (count % limit ? 1 : 0);
}
