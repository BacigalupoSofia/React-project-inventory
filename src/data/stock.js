// mock data for the app
// products data is all the products in the market, stockdata is the products in my stock.

// Constructor for products to create the products in the productsData
export class Product {
  constructor(
    id,
    productName,
    description,
    manufacturer,
    category,
    provider,
    image,
  ) {
    this.id = id;
    this.productName = productName;
    this.description = description;
    this.manufacturer = manufacturer;
    this.category = category;
    this.provider = provider;
    this.image = image;
  }
}

export const productsData = [
  new Product(
    1,
    "Dental Composite",
    "Light-cured restorative material",
    "3M",
    "Restorative",
    ["Henry Schein", "DMI"],
    "https://example.com/toothbrush.jpg",
  ),

  new Product(
    2,
    "Dental Gloves",
    "Disposable nitrile gloves",
    "Ansell",
    "Protection",
    ["Dontalia"],
    "https://example.com/toothbrush.jpg",
  ),
  new Product(
    3,
    "Etch",
    "Phosphoric acid etching gel",
    "3M",
    "Restorative",
    ["Dontalia"],
    "https://example.com/toothbrush.jpg",
  ),
  new Product(
    4,
    "Gelatamp",
    "Post extraction hemostatic agent",
    "3M",
    "Surgery",
    ["Henry Schein", "DMI"],
    "https://example.com/toothbrush.jpg",
  ),
];

// Constructor for stock (because i can have more than one product of the same type)
// to create the products in my stock.
// productId to link the stock to the product in productsData

export class Stock {
  constructor(id, productId, quantity, expiryDate) {
    this.id = id;
    this.productId = productId;
    this.quantity = quantity;
    this.expiryDate = expiryDate;
  }
}

export const stockData = [
  new Stock(1, 1, 15, "2023-12-31"),
  new Stock(2, 2, 5, "2023-12-31"),
  new Stock(2, 2, 5, "2023-12-20"),
  new Stock(3, 3, 6, "2023-12-31"),
];

export const providersData = [
  {
    name: "Henry Schein",
    webSite: "https://www.henryschein.ie/",
    logo: "https://assets.henryschein.com/HS_IE_EN_Banner_HSIEGEP042-08-22_Hero-Banner-3x2.svg",
  },
  {
    name: "Dontalia",
    webSite: "https://www.dontalia.com/",
    logo: "https://d2p3duacfnfxvs.cloudfront.net/dontalia-com/media/dontalia-com-orange-header-svg.svg",
  },
  {
    name: "DMI",
    webSite: "https://www.dmi.ie/",
    logo: "https://picsum.photos/200 ",
  },
  {
    name: "BF Mulholland",
    webSite: "https://www.example.com/",
    logo: "https://picsum.photos/200 ",
  },
  {
    name: "Basiq Dental",
    webSite: "https://www.example.com/",
    logo: "https://picsum.photos/200 ",
  },
];
