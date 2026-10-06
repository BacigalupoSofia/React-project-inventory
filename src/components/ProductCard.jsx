export default function ProductCard({
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
        <dt>Description:</dt>
        <dd>{description}</dd>
      </dl>
    </article>
  );
}
