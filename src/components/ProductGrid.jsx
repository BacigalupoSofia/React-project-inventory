import { useState, useEffect } from "react";
import { stockData } from "../data/stock";

function ProductCard({
  id,
  productName,
  description,
  stockquantity,
  minimumquantity,
  manufacturer,
  category,
  provider,
  image,
  onAddToCart, //prop to pass the function from ProductGrid to ProductCard, need to be in the button as well
  isAddedToCart,
}) {
  return (
    <article
      className="card product-card"
      aria-label={`Product Card for ${productName}`}
    >
      <img className="card-img-top p-2" src="https://picsum.photos/200 " />

      <div className="card-body d-flex flex-column">
        <h2 className="card-title product-name">{productName}</h2>
        <dl className="card-meta">
          <dd className="product-manufacturer">{manufacturer}</dd>
          <dd className="product-description">{description}</dd>
          <dd>
            <button className="btn "> ➕ </button> {stockquantity}{" "}
            <button className="btn"> ➖ </button>
          </dd>
          <dd>
            <button className="btn btn-primary">See Product Details</button>
            <button
              className="btn cart-btn btn-primary"
              onClick={() => onAddToCart(id)}
            >
              {isAddedToCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </dd>
        </dl>
      </div>
    </article>
  );
}

export default function ProductGrid({ addedToCart, setAddedToCart }) {
  const addToCart = (productId) => {
    // shorthand to add to cart if is not in the array already, if false filter the array and return the ones that dont match id, if true add to prev array and return
    //will return and array and setAddedToCart will update AddedToCart.
    setAddedToCart((prev) => {
      return prev.includes(productId)
        ? prev.filter((product) => {
            return product !== productId;
          })
        : [...prev, productId];
    });
  };

  return (
    <section id="center">
      <div className="product-grid p-5 m-3">
        {addedToCart.length > 0 && (
          <p>Products added to cart: {addedToCart.join(", ")}</p>
        )}
        {stockData.map((item) => (
          <ProductCard
            {...item}
            key={item.id}
            isAddedToCart={addedToCart.includes(item.id)}
            onAddToCart={() => addToCart(item.id)}
          />
        ))}
      </div>
    </section>
  );
}
