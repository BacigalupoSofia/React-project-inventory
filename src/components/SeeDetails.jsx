import { useParams } from "react-router-dom";
import { stockData } from "../data/stock";

export default function SeeDetails() {
  const { id } = useParams();
  const seeProduct = stockData.find((p) => p.id === Number(id));

  if (!seeProduct) {
    return <h2> PRODUCT NOT FOUND </h2>;
  }

  return (
    <>
      <h2> Product details {id} </h2>
      <p> {seeProduct.productName} </p>;
    </>
  );
}

//dinamic route to see details of the product in stock when click See details button
// USe Hook usePArams to read the parameter in the url
// LINK created for seedetails button in product card, parameter passed from product grid to product card
// curlybrakets to make the route dinamic, concatenate with backticks the route in the link ${}
