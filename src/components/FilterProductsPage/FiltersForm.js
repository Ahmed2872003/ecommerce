import { useRef, useState, useContext } from "react";
import { pageContext } from "../../Contexts/Page";

export default function FiltersForm({ filters, setFilters }) {
  const [price, setPrice] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const priceInput = useRef(null);

  const { screen } = useContext(pageContext);

  function handleChangedFilters(e) {
    e.preventDefault();
    const { target: filterInput } = e;
    const filter = {};
    let filterContent;

    switch (filterInput.name) {
      case "rating":
      case "price":
        filterContent = { gte: filterInput.value };
        break;
      default:
        break;
    }

    filter[filterInput.name] = filterContent;

    setIsFilterOpen(false);

    setFilters((prevFilters) => ({
      ...prevFilters,
      ...filter,
    }));
  }

  return (
    <div className={screen.isMobile ? "float-list" : ""}>
      {screen.isMobile && (
        <div id="filters-btn-sec">
          <span
            id="filter-btn"
            onClick={() => setIsFilterOpen((preVal) => !preVal)}
          >
            Filters
            <i
              class={`fa fa-angle-${isFilterOpen ? "up" : "down"}`}
              aria-hidden="true"
            ></i>
          </span>
        </div>
      )}
      <form className={`filters ${isFilterOpen ? "show-filters" : ""}`}>
        <div className="filter review-filter">
          <span>Customer reviews</span>
          <div>
            <select
              name="rating"
              defaultValue={0}
              onChange={handleChangedFilters}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <span>& Up</span>
          </div>
        </div>
        <div className="filter price-filter">
          <span>Price</span>
          <div>
            <input
              ref={priceInput}
              type="range"
              min={0}
              max={10000}
              name="price"
              defaultValue={0}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span>{price} EGP</span>
            <span>& Up</span>
            <button
              className="rounded"
              onClick={(e) => {
                e.target = priceInput.current;
                handleChangedFilters(e);
              }}
            >
              Go
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
