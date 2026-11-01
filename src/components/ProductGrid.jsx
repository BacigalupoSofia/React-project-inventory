import { useState, useEffect } from "react";
import { stockData } from "../data/stock";
import { Link } from "react-router-dom";

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
  productID,
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
            <button className="btn plus "> ➕ </button> {stockquantity}{" "}
            <button className="btn minus"> ➖ </button>
          </dd>
          <dd className="buttons-container">
            <button className=" btn-primary">
              <Link to={`/stock/${productID}`}> See Product Details </Link>
            </button>
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

export default function ProductGrid({
  addedToCart,
  setAddedToCart,
  filteredProducts,
}) {
  //To add and save my cart
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
    <>
      <div className="product-grid p-5 m-3">
        {filteredProducts.map((item) => (
          <ProductCard
            {...item}
            key={item.id}
            isAddedToCart={addedToCart.includes(item.id)}
            onAddToCart={addToCart}
            productID={item.id}
          />
          //making cards just for filtered products by category
        ))}
      </div>
    </>
  );
}
