// Components
import GenStars from "./genStars";

// Modules
import React, { useContext, useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";

// Utils
import getCurrentCustomerData from "../util/getCurrentUserData";
import { userContext } from "../util/Contexts/UserContext";

// CSS
import "./Review.css";
import axios from "axios";

const userData = getCurrentCustomerData();

export default function Review(props) {
  // useContext
  const { user, isLoggedIn } = useContext(userContext);

  // useState
  const [isEditRequired, setIsEditRequired] = useState(false);
  const [commentInput, setCommentInput] = useState(props.reviewData.comment);
  const [ratingInput, setRatingInput] = useState(props.reviewData.rating);

  // useRef
  const reviewMethodsListElement = useRef(null);
  const listIconElement = useRef(null);

  const isCurrentUserReview =
    isLoggedIn && user.id === props.reviewData.CustomerId;

  if (isCurrentUserReview) props.reviewData.customerName = "You";

  // const reviewMethods = ["Edit", "Delete"];

  // useEffect
  useEffect(() => {
    if (isCurrentUserReview) {
      function globalClick(e) {
        const parentNode = e.target.parentNode;

        const parentNodeClassList = parentNode.classList;
        if (!parentNode.tagName) return;
        if (
          !parentNodeClassList.contains("review-methods-list-con") &&
          !parentNodeClassList.contains("review-methods-list") &&
          reviewMethodsListElement.current &&
          listIconElement.current
        ) {
          reviewMethodsListElement.current.classList.add("hidden");
          listIconElement.current.classList.remove("clicked");
        }
      }

      window.addEventListener("click", globalClick, true);

      return () => {
        window.removeEventListener("click", globalClick, true);
      };
    }
  }, []);

  // handle functions
  async function handleEditReview(e) {
    const btnText = e.target.innerText;
    try {
      e.target.innerHTML = ReactDOMServer.renderToString(
        props.btnLoading.current
      );

      await axios.patch(axios.BASE_URL + `/review/${props.reviewData.id}`, {
        comment: commentInput,
        rating: ratingInput,
      });

      const {
        data: {
          data: { product },
        },
      } = await axios.get(axios.BASE_URL + `/product/${props.productId}`);

      props.reviewData.comment = commentInput;
      props.reviewData.rating = ratingInput;

      props.setProductData((preValue) => ({
        ...preValue,
        rating: product.rating,
      }));

      setIsEditRequired(false);

      props.setMsg(["success", "Review is edited successfully"]);
    } catch (err) {
      if (err.response.data) {
        if (err.response.status === 400) {
          setCommentInput(props.reviewData.comment);
          setRatingInput(props.reviewData.rating);
        }

        props.setMsg(["error", err.response.data.msg]);
      }
    }
    e.target.innerText = btnText;
  }

  async function handleDeleteReview() {
    const removeIntent = window.confirm(
      "Are you sure you want to remove the review"
    );

    if (!removeIntent) return;

    try {
      await axios.delete(axios.BASE_URL + `/review/${props.reviewData.id}`);

      props.setCurrentUserReview(null);

      props.setMsg(["success", "Your review has been deleted"]);

      const product = await props.getProduct(props.productId);

      props.setProductData((preValue) => ({
        ...preValue,
        rating: product.rating,
        reviewsCount: product.reviewsCount,
      }));
    } catch (err) {
      console.log(err);
    }
  }

  function resetListView() {
    reviewMethodsListElement.current.classList.add("hidden");
    listIconElement.current.classList.remove("clicked");
  }

  return (
    <>
      <div className="review-con" id={props.reviewData.id}>
        <div className="w-50">
          <img
            src={require("../images/customer.jpeg")}
            alt="customer-img"
            width={34}
            height={34}
          ></img>
          <span className="m-3">{props.reviewData.customerName}</span>
          <br />
          {isEditRequired ? (
            <>
              <label htmlFor="rating">Rating: </label>
              <select
                name="rating"
                id="rating"
                defaultValue={ratingInput}
                onChange={(e) => setRatingInput(e.target.value)}
              >
                {Array(10)
                  .fill(0)
                  .map((item, index) => (
                    <option value={(index + 1) * 0.5} key={index}>
                      {(index + 1) * 0.5}
                    </option>
                  ))}
              </select>
            </>
          ) : (
            <GenStars rating={props.reviewData.rating} />
          )}
          <p style={{ color: "var(--amz-grey)" }}>
            {props.reviewData.createdAt.split("T")[0]}
          </p>
          {isEditRequired ? (
            <>
              <textarea
                type="text"
                name="comment"
                placeholder="Enter your comment"
                defaultValue={commentInput}
                className="flex-grow-1 p-2 w-100"
                minLength={3}
                maxLength={200}
                style={{ maxHeight: 120, marginBottom: 20 }}
                onChange={(e) => setCommentInput(e.target.value)}
              ></textarea>
              <div className="d-flex justify-content-end gap-1">
                <button className="hover-reg" onClick={handleEditReview}>
                  Edit
                </button>
                <button
                  className="hover-reg"
                  onClick={() => setIsEditRequired(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <p
              dangerouslySetInnerHTML={{ __html: props.reviewData.comment }}
            ></p>
          )}
        </div>
        {isCurrentUserReview && (
          <div className="review-methods-list-con">
            <i
              className="fa-solid fa-ellipsis-vertical reviews-methods-btn"
              ref={listIconElement}
              onClick={(e) => {
                e.target.classList.toggle("clicked");
                reviewMethodsListElement.current.classList.toggle("hidden");
              }}
            ></i>
            <ul
              className="review-methods-list hidden"
              ref={reviewMethodsListElement}
            >
              <li
                id="edit-btn"
                onClick={() => {
                  resetListView();
                  setIsEditRequired(true);
                }}
              >
                Edit
              </li>
              <li
                id="delete-btn"
                onClick={() => {
                  resetListView();
                  handleDeleteReview();
                }}
              >
                Delete
              </li>
            </ul>
          </div>
        )}
      </div>
      <hr />
    </>
  );
}
