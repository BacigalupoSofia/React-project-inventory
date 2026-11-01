import { useParams } from "react-router-dom";

export default function SeeDetails() {
  const { id } = useParams();
  return <p>Product details {id} </p>;
}

//dinamyc route to see details of the product in stock when click See details button
// USe Hook usePArams to read the parameter in the url
