// Example of coupling to internal data structures

type Customer = {
  id: string;
  name: string;
  shipmentAddress: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
};

const printShipmentLabel = (address: string, customerFullName: string) => {
  return `Delivery address:\n\n${customerFullName}\n${address}`;
};

const shipProductToCustomer = (product: Product, customer: Customer) => {
  const shipmentLabel = printShipmentLabel(customer.shipmentAddress, customer.name);

  console.log(`Initiated shipment to ${shipmentLabel}`);
};

const updateCustomerShippingAddress = (customer: Customer, newAddress: string) => {
  if (!Boolean(newAddress)) {
    throw new Error("Invalid address, must be a non-empty string.");
  }

  customer.shipmentAddress = newAddress;
};

// Example of coupling to data format (harder to catch, specially if automated test suit is weak)

type Discount = {
  id: string;
  productId: string;
  discountPct: number;
};

const getProductDiscount = (discounts: Discount[], product: Product) =>
  discounts.find((disc) => disc.productId === product.id)?.discountPct || 0;

const calculateSum = (prev: number, curr: number) => prev + curr;

const fromProductToDiscount = (discountTable: Discount[]) => (product: Product) =>
  getProductDiscount(discountTable, product) * product.price;

const calculateTotalDiscount = (products: Product[], discounts: Discount[]) =>
  products.map(fromProductToDiscount(discounts)).reduce(calculateSum, 0);

const products: Product[] = [
  {
    id: "a",
    name: "Wonderful perfume",
    price: 10,
  },
  {
    id: "b",
    name: "Washing liquid",
    price: 3,
  },
  {
    id: "d",
    name: "Vacuum cleaner",
    price: 50,
  },
];

const discounts: Discount[] = [
  {
    id: "dA",
    productId: "a",
    discountPct: 0.4,
  },
  {
    id: "dB",
    productId: "b",
    discountPct: 0.1,
  },
  {
    id: "dC",
    productId: "c",
    discountPct: 0.55,
  },
];

console.log(calculateTotalDiscount(products, discounts));

export {};
