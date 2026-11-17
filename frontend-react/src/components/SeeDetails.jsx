import { useParams } from "react-router-dom";
//import { stockData, productsData } from "../data/stock";

export default function SeeDetails(products, stockProducts) {
  const { id } = useParams();

  const seeProduct = products.filter((p) => p.id === Number(id));
  const productStock = stockProducts.filter((p) => p.productId === Number(id));

  if (!seeProduct) {
    return <h2> PRODUCT NOT FOUND </h2>;
  }

  return (
    <>
      <h2> Product details {id} </h2>
      <p> {seeProduct.productName} </p>;<h3>Stock details</h3>
      <p>
        {stockProducts.length > 0 ? (
          stockProducts.map((stock) => (
            <div key={stock.id}>
              <p>Quantity: {stock.quantity}</p>
              <p>Expiry date: {stock.expiryDate}</p>
            </div>
          ))
        ) : (
          <p>No stock available for this product.</p>
        )}
      </p>
      ;
    </>
  );
}

//dinamic route to see details of the product in stock when click See details button
// USe Hook usePArams to read the parameter in the url
// LINK created for seedetails button in product card, parameter passed from product grid to product card
// curlybrakets to make the route dinamic, concatenate with backticks the route in the link ${}
