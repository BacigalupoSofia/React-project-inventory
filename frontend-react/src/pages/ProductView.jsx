import SideBarCategories from "../components/SideBarCategories";
import ProductGrid from "../components/ProductGrid";
import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
//import { stockData, productsData } from "../data/stock";

//Page that have a heading, side bar with and product grid that share the state of category.

/* PRODUCTVIEW
1. Manage selected category
2. Filter products that belong to clinic stock and passes them to childen components
*/

export default function ProductView({
  addedToCart,
  setAddedToCart,
  products,
  error,
  stockProducts,
}) {
  // Selectedcategory to remember user selection, setselectedcategory to changed it.
  const [selectedCategory, setSelectedCategory] = useState("All");

  /*Categories to display in side bar:
 map through ALL the products and get the category, 'set()' store unique values, delete duplicates*/
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  /* products with stock record || use ids to match both objects
  filter() to keep products that match with stock some(), comparing their Ids*/

  const clinicProducts = products.filter((product) =>
    stockProducts.some(
      (stockProduct) => String(stockProduct.id) === String(product.id),
    ),
  );

  /*  Filtering by category: if i select All i will display all stockData, 
  if category selected (click on button-onSelectCategory) look just for the product with the same category */
  const filteredProducts =
    selectedCategory === "All"
      ? clinicProducts
      : clinicProducts.filter((p) => p.category === selectedCategory);

  return (
    <DashboardLayout
      sidebar={
        <SideBarCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      }
    >
      <ProductGrid
        selectedCategory={selectedCategory}
        addedToCart={addedToCart}
        setAddedToCart={setAddedToCart}
        filteredProducts={filteredProducts}
        stockProducts={stockProducts}
      />
    </DashboardLayout>
  );
}
