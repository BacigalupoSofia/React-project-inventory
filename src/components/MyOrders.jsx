import { stockData } from "../data/stock";

export default function MyOrders() {
  const addedToCart = JSON.parse(localStorage.getItem("addedToCart") || "[]");

  return (
    <section id="center">
      <div className="my-orders-content p-5 m-3">
        <h2>My Orders</h2>

        {addedToCart.map((productId) => {
          const product = stockData.find((item) => item.id === productId);

          return product ? (
            <div key={product.id}>
              <h3>{product.productName}</h3>
              <p>{product.description}</p>
            </div>
          ) : null;
        })}
      </div>
    </section>
  );
}
