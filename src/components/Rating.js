export default function Rating({ rating }) {
  let starsElements = [];
  // rating = +rating;
  for (let i = 0; i < 5; i++) {
    if (rating > 0 && rating < 1)
      starsElements.push(
        <i className="fa-solid fa-star-half-stroke" key={i + 1}></i>
      );
    else if (rating >= 1)
      starsElements.push(<i className="fa-solid fa-star" key={i + 1}></i>);
    else starsElements.push(<i className="fa-regular fa-star" key={i + 1}></i>);
    rating--;
  }
  return <span className="r-icons-con">{starsElements}</span>;
}
