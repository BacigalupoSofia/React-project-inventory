//import { stockData, productsData } from "../data/stock";

import { useState } from "react";
import { providersData } from "../data/stock";
import DashboardLayout from "../layouts/DashboardLayout.jsx";

// Side bar to show all the providers, but product shown is just the ones added to my cart

export default function MyOrders({ addedToCart, products, stockProducts }) {
  const [selectedProvider, setSelectedProvider] = useState("All");

  //ids from cart to match products and stock
  const toOrder = addedToCart
    .map((productId) => {
      const product = products.find(
        (item) => String(item.id) === String(productId),
      );
      const stockProduct = stockProducts.find(
        (item) => String(item.id) === String(productId),
      );

      return product && stockProduct
        ? {
            ...product,
            ...stockProduct,
          }
        : null;
    })
    .filter(Boolean);

  const providers = [
    "All",
    ...new Set(providersData.map((p) => p.name)),
    //providers to display in my side bar:
    //map through all the providers and get the name, FLAT map to join all the  array of providers
    // ..new takes the values from set and put them into an array
  ];

  const filteredProducts =
    selectedProvider === "All"
      ? toOrder
      : toOrder.filter((p) =>
          Array.isArray(p.provider)
            ? p.provider.includes(selectedProvider)
            : p.provider === selectedProvider,
        );

  //filter my products that contains the selected provider in their array provider, or if is a string will compare directly

  return (
    <DashboardLayout
      sidebar={
        <SideBarProviders
          providers={providers}
          selectedProvider={selectedProvider}
          onSelectProvider={setSelectedProvider}
        />
      }
    >
      <div className="my-orders-content p-5 m-3">
        <h2>My Orders</h2>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <li key={p.id}>
              <div>
                <h3>{p.productName}</h3>
                <p>{p.description}</p>
              </div>
            </li>
          ))
        ) : (
          <p>No products added</p>
        )}
      </div>
    </DashboardLayout>
  );
}

//Providers side bar
function SideBarProviders({ providers, selectedProvider, onSelectProvider }) {
  //To filter by provider name in my  side bar

  return (
    <>
      <aside className="category-bar">
        <h3>Providers</h3>

        {providers.map((provider) => (
          <button
            key={provider}
            className={selectedProvider === provider ? "active" : ""}
            onClick={() => onSelectProvider(provider)}
          >
            {provider === "All" ? "All Products" : provider}
          </button>
          //changes the text in my button from all default in my state in productGrid to category
        ))}
      </aside>
    </>
  );
}
