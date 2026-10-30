import { useState } from "react";
import Header from "./components/Header.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import Home from "./components/Home.jsx";
import Providers from "./components/Providers.jsx";
import MyOrders from "./components/MyOrders.jsx";
import Session from "./components/Session.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/stock" element={<ProductGrid />} />
        <Route path="/" element={<Home />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/session" element={<Session />} />
      </Routes>
    </>
  );
}

export default App;
