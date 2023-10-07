export default function genStars(rating) {
  let starsElements = [];
  for (let i = 0; i < 5; i++) {
    if (rating > 0 && rating < 1)
      starsElements.push(<i class="fa-solid fa-star-half-stroke"></i>);
    else if (rating >= 1) starsElements.push(<i class="fa-solid fa-star"></i>);
    else starsElements.push(<i class="fa-regular fa-star"></i>);
    rating--;
  }
  return starsElements;
}
