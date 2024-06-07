import { createElement, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router";

import { userContext } from "../../Contexts/User";

import { pageContext } from "../../Contexts/Page";

import { productAPI } from "../../util/API/APIS";

import ProductRow from "./ProductRow";

import "./ManageProductsPage.css";
import errorHandler from "../../util/errors/errorHandler";

const limit = 5;

export default function ManageProductsPage() {
  const nav = useNavigate();

  const { user } = useContext(userContext);
  const page = useContext(pageContext);

  const [pageNum, setpageNum] = useState(1);

  const [isPageChanging, setIsPageChanging] = useState(false);

  const [createdProducts, setCreatedProducts] = useGetCreatedProducts(
    user.id,
    pageNum,
    limit
  );

  const productRows =
    createdProducts &&
    createdProducts.products.map((p) => (
      <ProductRow
        key={p.id}
        product={p}
        limit={limit}
        pageNum={pageNum}
        setpageNum={setpageNum}
        createdProducts={createdProducts}
        setCreatedProducts={setCreatedProducts}
        setIsPageChanging={setIsPageChanging}
        sellerId={user.id}
      />
    ));

  const pagesNum =
    createdProducts &&
    calcPagesNum(createdProducts.MatchedProductsCount, limit);

  const pagesNumOptions =
    pagesNum &&
    Array(pagesNum)
      .fill(null)
      .map((e, ind) => <option value={ind + 1}>{ind + 1}</option>);

  useEffect(() => {
    page.loading.setLoading(true);
  }, []);

  useEffect(() => {
    setIsPageChanging(false);
  }, [createdProducts]);

  function handlePageChange(e) {
    setIsPageChanging(true);

    setpageNum(+e.target.value);
  }

  return (
    <>
      {createdProducts &&
        (createdProducts.MatchedProductsCount === 0 ? (
          <p className="centered-msg">No products have been added yet</p>
        ) : (
          <div id="inventory-con">
            {isPageChanging && <div className="cover-con"></div>}
            <h4 className="title">Manage Inventory</h4>
            <p style={{ color: "var(--amz-grey)" }}>
              <b>{createdProducts.MatchedProductsCount} Product(s)</b>
            </p>
            <table
              id="products-table"
              className="table table-striped table-hover"
            >
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
              value={pageNum}
              onChange={handlePageChange}
              disabled={isPageChanging}
            >
              {pagesNumOptions}
            </select>
          </div>
        ))}
      <button
        type="button"
        className="btn btn-warning rounded-circle p-0 add-btn"
        onClick={() => nav("/account/inventory/product/create")}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    </>
  );
}

function useGetCreatedProducts(sellerId, pageNum, limit) {
  const [createdProducts, setCreatedProducts] = useState(null);

  const page = useContext(pageContext);

  useEffect(() => {
    (async () => {
      await errorHandler(async () => {
        const products = await productAPI.get({
          SellerId: { eq: sellerId },
          page: { eq: pageNum },
          limit: { eq: limit },
        });
        setCreatedProducts(products);
      }, page.alertMsg.setMsg);

      page.loading.setLoading(false);
    })();
  }, [pageNum]);

  return [createdProducts, setCreatedProducts];
}

function calcPagesNum(count, limit) {
  return Math.floor(count / limit) + (count % limit ? 1 : 0);
}
