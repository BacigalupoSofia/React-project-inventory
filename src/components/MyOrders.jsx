import { stockData } from "../data/stock";

export default function MyOrders({ addedToCart }) {
  return (
    <section id="center">
      <div className="my-orders-content p-5 m-3">
        <h2>My Orders</h2>

        {addedToCart.map((productId) => {
          const product = stockData.find((item) => item.id === productId);

          return product ? (
            <li>
              <div key={product.id}>
                <h3>{product.productName}</h3>
                <p>{product.description}</p>
              </div>
            </li>
          ) : null;
        })}
      </div>
    </section>
  );
}
