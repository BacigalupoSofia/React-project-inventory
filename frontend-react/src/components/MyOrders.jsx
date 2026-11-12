import { stockData, productsData } from "../data/stock";
import { useState } from "react";
import { providersData } from "../data/stock";

// Side bar to show all the providers, but product shown is just the ones added to my cart

export default function MyOrders({ addedToCart }) {
  const [selectedProvider, setSelectedProvider] = useState("All");

  const toOrder = addedToCart
    .map((productId) => {
      const product = productsData.find((item) => item.id === productId);

      const stockProductToOrder = stockData.find(
        (item) => item.productId === productId,
      );

      console.log("Cart product ID:", productId);
      console.log("Product found:", product);
      console.log("Stock found:", stockProductToOrder);

      // Combine product details and stock details
      return product && stockProductToOrder
        ? {
            ...stockProductToOrder,
            ...product,
            quantity: stockProductToOrder.quantity,
            expiryDate: stockProductToOrder.expiryDate,
            stockId: stockProductToOrder.id,
          }
        : null;
    })
    .filter(Boolean);
  console.log("Products to order:", toOrder);

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
  console.log("Cart:", addedToCart);
  console.log("Products:", productsData);
  console.log("Stock:", stockData);
  console.log("To order:", toOrder);
  console.log("Filtered products:", filteredProducts);

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
    </div>
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
