import ProductCard from "./ProductCard";

export default function MyOrders({ addedToCart }) {
  return (
    <section id="center">
      <div className="my-orders-content p-5 m-3">
        <h2>My Orders</h2>
        <p>List of my orders will be displayed here.</p>
      </div>
    </section>
  );
}
