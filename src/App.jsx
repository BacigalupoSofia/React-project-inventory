import { useState } from "react";
import { stockData } from "./data/stock.js";
import "./App.css";

function App() {
  return (
    <section id="center">
      <div className="container">
        {stockData.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Manufacturer: {item.manufacturer}</p>
            <p>Category: {item.category}</p>
            <p>Provider: {item.provider.join(", ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
