import { useState } from "react";
import { stockData } from "./data/stock.js";
import ProductCard from "./components/ProductCard.jsx";

function App() {
  return (
    <section id="center">
      <div className="container">
        {stockData.map((item) => (
          <ProductCard {...item} key={item.id} />
        ))}
      </div>
    </section>
  );
}

export default App;
