// Modules

import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactDOMServer from "react-dom/server";

// Components
import Review from "../Review";
import LoadingIcons from "react-loading-icons";

// Utils
import convertToQuery from "../../util/convertToQuery";
import Rating from "../Rating";
import { userContext } from "../../Contexts/User";
import { pageContext } from "../../Contexts/Page";

export default function ReveiwsSection(props) {
  const [reviewsData, setReviewsData] = useState([]);
  const [isSectionLoading, setIsSectionLoading] = useState(true);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);
  const [currentUserReview, setCurrentUserReview] = useState(null);
  const [selectedFilterId, setSelectedFilterId] = useState("All");
  const [moreReviews, setMoreReviews] = useState({
    get: false,
    isLoading: false,
  });

  // useContext
  const { user, isLoggedIn } = useContext(userContext);
  const { alertMsg } = useContext(pageContext);

  // userRef
  const reviewsSection = useRef(null);
  const addReviewBtn = useRef(null);

  // useEffect
  useEffect(() => {
    async function checkScrollThenFetch() {
      if (
        window.scrollY + window.innerHeight >=
        reviewsSection.current.offsetTop
      ) {
        const filter = {
          ProductId: { eq: props.productData.id },
          limit: { eq: 5 },
        };

        const reviews = await getReviews(
          convertToQuery({
            ...filter,
            CustomerId: { ne: isLoggedIn ? user.id : null },
          })
        );

        const userReview = await getReviews(
          convertToQuery({
            ...filter,
            CustomerId: { eq: isLoggedIn ? user.id : null },
          })
        );

        window.removeEventListener("scroll", checkScrollThenFetch);

        setReviewsData(reviews);

        setCurrentUserReview(userReview[0]);

        if (reviews.length === 5)
          setMoreReviews((preValue) => ({ ...preValue, get: true }));

        setIsSectionLoading(false);
      }
    }

    window.addEventListener("scroll", checkScrollThenFetch);

    return () => window.removeEventListener("scroll", checkScrollThenFetch);
  }, [props.productData.id]);

  //   Handling function
  async function handleReviewsFilter(event) {
    event.stopPropagation();
    try {
      const reviewRate = Number.parseInt(event.target.innerText);

      const filter = {
        ProductId: { eq: props.productData.id },
        CustomerId: { ne: isLoggedIn ? user.id : null },
        limit: { eq: 5 },
      };

      if (reviewRate)
        filter["rating"] = { gt: +reviewRate - 1, lte: +reviewRate };

      const query = convertToQuery(filter);

      setIsReviewsLoading(true);

      const reviews = await getReviews(query);

      setReviewsData(reviews);

      if (reviews.length < 5)
        setMoreReviews((preValue) => ({ ...preValue, get: false }));
      else if (reviews.length === 5)
        setMoreReviews((preValue) => ({ ...preValue, get: true }));

      setIsReviewsLoading(false);

      setSelectedFilterId(event.target.parentNode.getAttribute("id"));
    } catch (err) {
      console.log(err);
    }
  }

  async function getReviews(filters) {
    // return new Promise((res, rej) => {
    //   setTimeout(async () => {
    //     const {
    //       data: {
    //         data: { reviews },
    //       },
    //     } = await axios.get(axios.BASE_URL + `/review?${filters}`);

    //     res(reviews);
    //   }, 1000);
    // });

    const {
      data: {
        data: { reviews },
      },
    } = await axios.get(axios.BASE_URL + `/review?${filters}`);

    return reviews;
  }

  async function handleGetMoreReviews() {
    const reviewRate = Number.parseInt(selectedFilterId);
    const filter = {
      ProductId: { eq: props.productData.id },
      CustomerId: { ne: isLoggedIn ? user.id : null },
      limit: { eq: 5 },
      page: { eq: reviewsData.length / 5 + 1 },
    };
    if (reviewRate)
      filter["rating"] = { gt: +reviewRate - 1, lte: +reviewRate };

    setMoreReviews((preValue) => ({ get: false, isLoading: true }));

    const reviews = await getReviews(convertToQuery(filter));

    setReviewsData((prevReviews) => [...prevReviews, ...reviews]);

    if (reviews.length < 5)
      setMoreReviews((preValue) => ({ ...preValue, get: false }));
    else if (reviews.length === 5)
      setMoreReviews((preValue) => ({ ...preValue, get: true }));

    setMoreReviews((preValue) => ({ ...preValue, isLoading: false }));
  }

  async function handleReviewSubmit(e) {
    e.preventDefault();

    const BtnTxt = addReviewBtn.current.innerText;

    addReviewBtn.current["disabled"] = true;

    addReviewBtn.current.innerHTML = ReactDOMServer.renderToString(
      props.btnLoading.current
    );

    const formData = new FormData(e.target);

    try {
      await axios.post(axios.BASE_URL + "/review", {
        comment: formData.get("reviewContent"),
        rating: formData.get("rating"),
        ProductId: props.productData.id,
      });

      const userReview = await getReviews(
        convertToQuery({
          CustomerId: { eq: isLoggedIn ? user.id : null },
          ProductId: { eq: props.productData.id },
        })
      );

      const product = await props.getProduct(props.productData.id);

      props.setProductData((prevProductData) => ({
        ...prevProductData,
        rating: product.rating,
        reviewsCount: product.reviewsCount,
      }));

      setCurrentUserReview(userReview[0] || null);
      alertMsg.setMsg(["success", "Your review is added"]);
    } catch (err) {
      console.log(err.response);
    }

    addReviewBtn.current["disabled"] = false;
    addReviewBtn.current.innerText = BtnTxt;
  }

  const filterMenu = [
    "5 stars",
    "4 stars",
    "3 stars",
    "2 stars",
    "1 star",
    "All",
  ];

  return (
    <div id="reviews-sec" ref={reviewsSection}>
      {isSectionLoading ? (
        <LoadingIcons.Puff
          stroke="var(--amz-yellow)"
          style={{ margin: "auto", display: "block" }}
        />
      ) : (
        <>
          <h4>
            <strong>Users reviews</strong>
          </h4>

          <div id="reviews-con" className="flex-column flex-md-row">
            <div id="reviews-filter-con">
              <p>
                <Rating rating={props.productData.rating} />
                &nbsp;
                <span>{props.productData.rating} From 5</span>
              </p>
              <p
                style={{
                  color: "var(--amz-grey)",
                  fontWeight: "var(--font-w-b)",
                }}
              >
                {props.productData.reviewsCount} Reviews
              </p>
              <ul id="filters">
                {filterMenu.map((filterName, index) => (
                  <li key={index} id={filterName}>
                    <p
                      onClick={handleReviewsFilter}
                      className={
                        filterName === selectedFilterId ? "active" : ""
                      }
                    >
                      {filterName}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="d-flex flex-grow-1 flex-column gap-4">
              {isReviewsLoading ? (
                <LoadingIcons.Puff
                  stroke="var(--amz-yellow)"
                  style={{ margin: "auto", display: "block" }}
                  width={70}
                  height={70}
                />
              ) : isLoggedIn && user.id !== props.productData.Seller.id ? (
                !currentUserReview ? (
                  <form onSubmit={handleReviewSubmit}>
                    <textarea
                      name="reviewContent"
                      placeholder="Add your review"
                      className="flex-grow-1 p-2 w-100"
                      minLength={3}
                      maxLength={200}
                      style={{ maxHeight: 120, marginBottom: 20 }}
                    />
                    <lable for="rating">Rating</lable>&nbsp;&nbsp;&nbsp;
                    <select name="rating" defaultValue={5} id="rating">
                      {Array(10)
                        .fill(0)
                        .map((item, index) => (
                          <option value={0.5 * (index + 1)} key={index}>
                            {/* <GenStars rating={0.5 * (index + 1)} /> */}
                            {0.5 * (index + 1)}
                          </option>
                        ))}
                    </select>
                    <button
                      className="hover-yellow rounded float-end mt-3"
                      type="submit"
                      style={{ width: 60 }}
                      ref={addReviewBtn}
                    >
                      Add
                    </button>
                  </form>
                ) : (
                  <Review
                    reviewData={currentUserReview}
                    productId={props.productData.id}
                    getProduct={props.getProduct}
                    setProductData={props.setProductData}
                    setCurrentUserReview={setCurrentUserReview}
                    key={currentUserReview.id}
                    btnLoading={props.btnLoading}
                  />
                )
              ) : (
                ""
              )}
              {!isReviewsLoading ? (
                reviewsData.length > 0 ? (
                  <>
                    <div id="reviews">
                      {reviewsData.map((reviewData) => (
                        <Review
                          reviewData={reviewData}
                          setProductData={props.setProductData}
                          key={reviewData.id}
                        />
                      ))}
                    </div>
                    {moreReviews.get && (
                      <button
                        className="align-self-center a-hover"
                        style={{ backgroundColor: "transparent" }}
                        onClick={handleGetMoreReviews}
                      >
                        Get more
                      </button>
                    )}
                    {moreReviews.isLoading && (
                      <LoadingIcons.Puff
                        stroke="var(--amz-yellow)"
                        style={{ margin: "auto", display: "block" }}
                      />
                    )}
                  </>
                ) : !currentUserReview ? (
                  <p
                    style={{
                      margin: "auto",
                      color: "var(--amz-grey)",
                      fontWeight: "var(--font-w-b)",
                      fontSize: 30,
                    }}
                  >
                    No reviews found
                  </p>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
