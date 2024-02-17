// Modules
import { useState, useCallback } from "react";

import { Link, useNavigate } from "react-router-dom";

export default function CategoryNavList(props) {
  const navigate = useNavigate();

  const handleCatNavClick = useCallback((e, category) => {
    e.preventDefault();
    syncNavCatWithFormSelect(e);
    props.setSelectedCategory(category);
    navigate(`/search?categorylike=${category === "All" ? "" : category}`);
  }, []);

  const syncNavCatWithFormSelect = useCallback((e) => {
    if (props.selectCatElement.current)
      props.selectCatElement.current.value = e.target.innerText;
  }, []);

  const categoryNavElements = props.categories.map((category) => (
    <li
      key={category}
      className={
        category === props.selectedCategory ? "header-filter-list-active" : ""
      }
    >
      <Link onClick={(e) => handleCatNavClick(e, category)}>{category}</Link>
    </li>
  ));

  return (
    <div className="catigory-nav">
      <ul>{categoryNavElements}</ul>
    </div>
  );
}
