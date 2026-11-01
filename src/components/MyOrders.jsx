import { stockData } from "../data/stock";
import { useState } from "react";

// Side bar to show all the providers, but product shown is just the ones added to my cart

export default function MyOrders({ addedToCart }) {
  const [selectedProvider, setSelectedProvider] = useState("All");

  const product = addedToCart.map((productId) => {
    stockData.find((item) => item.id === productId);
  });

  const providers = [
    "All",
    ...new Set(stockData.flatMap((p) => p.provider)),
    //providers to display in my side bar:
    //map through all the products and get the category, FLAT map to join all the  array of providers
    // ..new takes the values from set and put them into an array
  ];

  const filteredProducts =
    selectedProvider === "All"
      ? stockData
      : stockData.filter((p) => p.provider.includes(selectedProvider));

  //filter my products that contains the selected provider in their array provider

  return (
    <div className="inventory-layout">
      <section className="side-bar-categories">
        <SideBarProviders
          providers={providers}
          selectedProvider={selectedProvider}
          onSelectProvider={setSelectedProvider}
        />
      </section>

      <div className="my-orders-content p-5 m-3">
        <h2>My Orders</h2>
        {filteredProducts ? (
          <li key={filteredProducts.id}>
            <div>
              <h3>{filteredProducts.productName}</h3>
              <p>{filteredProducts.description}</p>
            </div>
          </li>
        ) : null}
      </div>
    </div>
  );
}

//Providers side bar
function SideBarProviders({
  providers,
  selectedProvider,
  setSelectedProvider,
  onSelectProvider,
}) {
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
