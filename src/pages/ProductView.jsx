import SideBarCategory from "../components/SideBarCategories";
import ProductGrid from "../components/ProductGrid";
import { useState } from "react";
import { stockData } from "../data/stock";

//Page that have a heading, side bar with and product grid that share the state of category.

export default function ProductView({ addedToCart, setAddedToCart }) {
  //To filter by categories in my  side bar
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(stockData.map((p) => p.category)),
    //Categories to display in my side bar:
    //map through all the products and get the category, set store unique values, delete duplicates
    // ..new takes the values from set and put them into an array
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? stockData
      : stockData.filter((p) => p.category === selectedCategory);
  // if i select All i will display all stockData, if category selected look just for the product with the same category
  // selected category is coming from the click on button

  return (
    <div className="inventory-layout">
      <section className="side-bar-categories">
        <SideBarCategory
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          //when click my button in sidebar, react will call setSelectedCategory("Oral Care")
          //i pass to my sidebar the list of categories, which one is selected, and the method to set category clicking my button
        />
      </section>
      <section className="grid-layout">
        <ProductGrid
          selectedCategory={selectedCategory}
          addedToCart={addedToCart}
          setAddedToCart={setAddedToCart}
          filteredProducts={filteredProducts}
        />
      </section>
    </div>
  );
}
