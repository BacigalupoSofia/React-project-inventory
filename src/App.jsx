import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Providers from "./components/Providers.jsx";
import MyOrders from "./components/MyOrders.jsx";
import ProductView from "./pages/ProductView.jsx";
import Session from "./components/Session.jsx";
import NotFound from "./components/NotFound.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  //state and useeffect to pass props of currentcard and set to update my cart
  // i use this in product grid to add to cart
  // and in myorders to display that saved cart
  const [addedToCart, setAddedToCart] = useState(() => {
    const savedCart = localStorage.getItem("addedToCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("addedToCart", JSON.stringify(addedToCart));
  }, [addedToCart]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/stock"
          element={
            <ProductView
              addedToCart={addedToCart}
              setAddedToCart={setAddedToCart}
            />
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/providers" element={<Providers />} />
        <Route
          path="/orders"
          element={<MyOrders addedToCart={addedToCart} />}
        />
        <Route path="/session" element={<Session />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
