import { useState } from "react";
import Header from "./components/Header.jsx";
import ProductGrid from "./components/ProductCard.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProductGrid />} />
      </Routes>
    </>
  );
}

export default App;
