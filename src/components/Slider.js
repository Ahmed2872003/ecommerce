// Components
import { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import LoadingIcons from "react-loading-icons";

// CSS
import "react-multi-carousel/lib/styles.css";

export default function Slider(props) {
  const carouselRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1200 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1199, min: 992 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 991, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    setIsLoading(false);
  }, [props.children]);

  const handleAfterChange = async (previousSlide, { currentSlide, onMove }) => {
    const carouselState = carouselRef.current.state;

    const shownItems =
      carouselRef.current.props.responsive[carouselState.deviceType].items;

    const totalItems = carouselState.totalItems;

    if (currentSlide + shownItems >= totalItems) {
      try {
        setIsLoading(true);

        const relatedItems = await props.getRelatedItems(totalItems);

        props.setRelatedItems((prevItems) => [...prevItems, ...relatedItems]);
      } catch (err) {
        setIsLoading(false);
        console.log(err.response.data);
      }
    }
  };

  return (
    <div className="d-flex">
      <Carousel
        className="flex-grow-1"
        ref={carouselRef}
        responsive={responsive}
        slidesToSlide={1}
        swipeable={true}
        draggable={true}
        ssr={true}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        afterChange={handleAfterChange}
      >
        {props.children}
      </Carousel>
      {isLoading && (
        <LoadingIcons.Puff
          stroke="var(--amz-yellow)"
          width={90}
          height={90}
          style={{ margin: "auto", display: "block" }}
        />
      )}
    </div>
  );
}
