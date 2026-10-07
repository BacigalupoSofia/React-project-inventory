import { stockData } from "../data/stock";

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
}) {
  return (
    <article
      className="product-card"
      aria-label={`Product Card for ${productName}`}
    >
      <h2 className="product-name">{productName}</h2>
      <dl className="card-meta">
        <dd className="product-manufacturer">{manufacturer}</dd>
        <dd className="product-img">
          <img src="https://picsum.photos/200 " />
        </dd>

        <dd className="product-description">{description}</dd>
      </dl>
    </article>
  );
}

export default function ProductGrid() {
  return (
    <section id="center">
      <div className="card-container">
        {stockData.map((item) => (
          <ProductCard {...item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
