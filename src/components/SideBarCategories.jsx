import { stockData } from "../data/stock";
import { useState } from "react";

export default function SideBarCategory() {
  const [categories] = useState(() => {
    const currentCategories = [...new Set(stockData.map((p) => p.category))];
    // set removes duplicates, spread operator to get an array
    return ["All", ...currentCategories];
  });

  return (
    <aside className="category-sidebar">
      <h3>Categories</h3>

      {categories.map((category) => (
        <button
          key={category}
          className="category-filter"
          onClick={() => onSelectCategory(category)}
        >
          {category === "All" ? "All Products" : category}
        </button>
      ))}
    </aside>
  );
}
