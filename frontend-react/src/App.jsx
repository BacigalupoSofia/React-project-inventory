import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Providers from "./components/Providers.jsx";
import MyOrders from "./components/MyOrders.jsx";
import ProductView from "./pages/ProductView.jsx";
import Session from "./components/Session.jsx";
import NotFound from "./components/NotFound.jsx";
import { Routes, Route } from "react-router-dom";
import SeeDetails from "./components/SeeDetails.jsx";
import Footer from "./components/Footer.jsx";
import { api } from "./api.js";

function App() {
  const [products, setProducts] = useState([]);
  const [stockProducts, setStockProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .listProducts()
      .then(setProducts)
      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    api
      .listStockProducts("user-1")
      .then((data) => setStockProducts(Object.values(data))) //convert object to array to use my code
      .catch((error) => setError(error.message));
  }, []);

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
        <Route path="/" element={<Home />} />

        <Route
          path="/stock"
          element={
            <ProductView
              products={products}
              stockProducts={stockProducts}
              error={error}
              addedToCart={addedToCart}
              setAddedToCart={setAddedToCart}
            />
          }
        />
        <Route path="/stock/:id" element={<SeeDetails />} />

        <Route path="/providers" element={<Providers />} />
        <Route
          path="/orders"
          element={
            <MyOrders
              addedToCart={addedToCart}
              products={products}
              stockProducts={stockProducts}
            />
          }
        />
        <Route path="/session" element={<Session />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
