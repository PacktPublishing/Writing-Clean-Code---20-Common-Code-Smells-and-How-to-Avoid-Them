// Example regarding too many methods of distinct functionality

interface Product {
  getIdentifier(): string;
  getDescription(): string;
  getPrice(): number;
  setPrice(newPrice: number): void;
}

interface Order {
  getIdentifier(): string;
  getCustomerId(): string;
  setCustomerId(newCustomerId: string): void;
  getProducts(): Product[];
}

interface Return {
  getIdentifier(): string;
  getStatus(): string;
  getOrderId(): string;
  setOrderId(newOrderId: string): void;
  getReturnedProducts(): Product[];
}

interface OrderManager {
  createOrder: (customerId: string, products: Product[]) => Order;
  deleteOrder: (orderId: string) => void;
  addProductsToOrder: (orderId: string, products: Product[]) => void;
  removeProductsFromOrder: (orderId: string, products: Product[]) => void;
  getOrderDetails: (orderId: string) => Order;
  registerCustomerAddress: (customerId: string, address: string) => void;
  getCustomerAddress: (customerId: string) => string;
  setShipmentAddress: (orderId: string, address: string) => void;
  getShipmentAddress: (orderId: string) => string;
  initiateOrderReturn: (orderId: string, returnedProducts: Product[]) => Return;
  cancelReturn: (returnId: string) => void;
  getReturnStatus: (returnId: string) => string;
}

// Example regarding exposing too many internal implementation details

type CsvObject = {
  headers: string[];
  lines: string[];
};

interface CsvDataStore {
  readCsvFromFile: (filePath: string) => CsvObject;
  readCsvFromLink: (link: string) => CsvObject;
  parseCsvObject: (csvObject: CsvObject) => Record<string, string>[];
  convertRecordsToCsvObject: (records: Record<string, string>[]) => CsvObject;
  saveCsvToFile: (csvObject: CsvObject, filePath: string) => void;
  saveCsvToLink: (csvObject: CsvObject, link: string) => void;
}

export {};
