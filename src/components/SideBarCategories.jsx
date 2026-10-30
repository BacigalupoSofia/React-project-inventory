// Side bar to display all product or filter by category
// receive prop categories from ProductGrid, map through to create a button for each category
// button with event passes the category when user clics. If the selected category is equal to category, the class of the button will be active

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
        //changes the text in my button from all default in my state in productGrid to category
      ))}
    </aside>
  );
}
