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
      className="card product-card"
      aria-label={`Product Card for ${productName}`}
    >
      <img className="card-img-top p-2" src="https://picsum.photos/200 " />

      <div card-body d-flex flex-column align-items-center>
        <h2 className="card-title product-name">{productName}</h2>
        <dl className="card-meta">
          <dd className="product-manufacturer">{manufacturer}</dd>
          <dd className="product-description">{description}</dd>
          <dd>
            <button className="btn "> ➕ </button> {stockquantity}{" "}
            <button className="btn"> ➖ </button>
          </dd>
          <dd>
            <button className="btn btn-primary"> See Product </button>
          </dd>
        </dl>
      </div>
    </article>
  );
}

export default function ProductGrid() {
  return (
    <section id="center">
      <div className="product-grid p-5 m-3">
        {stockData.map((item) => (
          <ProductCard {...item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
