// Example of coupling to internal data structures

type CustomerRawData = {
  id: string;
  name: string;
  shipmentAddress: string;
};

class Customer {
  private _id: string;
  private _name: string;
  private _street: string = "";
  private _streetNumber: string = "";
  private _city: string = "";

  constructor(customerData: CustomerRawData) {
    this._id = customerData.id;
    this._name = customerData.name;
    this.setShipmentAddress(customerData.shipmentAddress);
  }

  setShipmentAddress(newShipmentAddress: string) {
    // street, num, city
    const addressComponent = newShipmentAddress.split(", ");
    this._street = addressComponent[0];
    this._streetNumber = addressComponent[1];
    this._city = addressComponent[2];
  }

  getShipmentAddress() {
    return `${this._street}, ${this._streetNumber}, ${this._city}`;
  }

  getName() {
    return this._name;
  }
}

type Product = {
  id: string;
  name: string;
  price: number;
};

const printShipmentLabel = (address: string, customerFullName: string) => {
  return `Delivery address:\n\n${customerFullName}\n${address}`;
};

const shipProductToCustomer = (product: Product, customer: Customer) => {
  const shipmentLabel = printShipmentLabel(customer.getShipmentAddress(), customer.getName());

  console.log(`Initiated shipment to ${shipmentLabel}`);
};

const updateCustomerShippingAddress = (customer: Customer, newAddress: string) => {
  if (!Boolean(newAddress)) {
    throw new Error("Invalid address, must be a non-empty string.");
  }

  customer.setShipmentAddress(newAddress);
};

// Example of coupling to data format (harder to catch, specially if automated test suit is weak)

type DiscountRawData = {
  id: string;
  productId: string;
  discountPct: number;
};

class Discount {
  private _id: string;
  private _productId: string;
  private _discountPct: number;

  constructor(discountData: DiscountRawData) {
    this._id = discountData.id;
    this._productId = discountData.productId;
    this._discountPct = discountData.discountPct;
  }

  isApplicableToProduct(product: Product) {
    return this._productId === product.id;
  }

  applyToProduct(product: Product) {
    return this._discountPct * product.price;
  }
}

const getProductDiscount = (discounts: Discount[], product: Product) =>
  discounts.find((disc) => disc.isApplicableToProduct(product));

const calculateSum = (prev: number, curr: number) => prev + curr;

const fromProductToDiscount = (discounts: Discount[], product: Product) =>
  getProductDiscount(discounts, product)?.applyToProduct(product) || 0;

const calculateTotalDiscount = (products: Product[], discounts: Discount[]) =>
  products.map((product) => fromProductToDiscount(discounts, product)).reduce(calculateSum, 0);

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

const discounts: DiscountRawData[] = [
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

console.log(
  calculateTotalDiscount(
    products,
    discounts.map((disc) => new Discount(disc))
  )
);

export {};
