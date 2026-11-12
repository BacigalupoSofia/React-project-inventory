import { Outlet } from "react-router-dom";

export default function ProductLayout() {
  return (
    <>
      <h1> PROBANDO PRODUCT LAYOUT </h1>
      <main>
        <Outlet />
      </main>
    </>
  );
}

//layout to share sidebar and main content withing product grid, product description, providers and orders
