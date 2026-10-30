import { stockData } from "../data/stock";
import { useState } from "react";

export default function SideBarCategory({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <aside className="category-sidebar">
      <h3>Categories</h3>

      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? "active" : ""}
          onClick={() => onSelectCategory(category)}
        >
          {category === "All" ? "All Products" : category}
        </button>
      ))}
    </aside>
  );
}
