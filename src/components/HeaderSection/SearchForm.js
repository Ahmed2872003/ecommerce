import { useCallback, useEffect, useRef } from "react";

import { useNavigate, useLocation } from "react-router";

export default function SearchForm(props) {
  const navigate = useNavigate();
  const { search } = useLocation();

  const nameInputElement = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(search);

    const paramsObject = Object.fromEntries(params);

    if (nameInputElement.current)
      nameInputElement.current.value = paramsObject.namelike || "";

    if (props.selectCatElement.current) {
      const paramsCategory = paramsObject.categorylike || "All";
      props.selectCatElement.current.value = paramsCategory;
      props.setSelectedCategory(paramsCategory);
    }
  }, []);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const params = new URLSearchParams(formData);

    const { name, category } = Object.fromEntries(params.entries());

    navigate(
      `search?namelike=${name}&categorylike=${
        category === "All" ? "" : category
      }`
    );
  }, []);

  return (
    <form className="search align-self-center" onSubmit={handleSearchSubmit}>
      <select
        name="category"
        defaultValue="All"
        onChange={(e) => props.setSelectedCategory(e.target.value)}
        ref={props.selectCatElement}
      >
        {props.categories.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        placeholder="Search Amazon"
        type="text"
        name="name"
        ref={nameInputElement}
      />
      <button type="submit" className="hover-yellow">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}
