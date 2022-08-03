interface ICustomer {
  getIdentifier(): string;
  getAddress(): string;
  hasPremiumSubscription(): boolean;
}

type OrderRawData = {
  id?: string;
  customer: ICustomer;
  productIds: string[];
};

interface IOrder {
  getProductIds(): string[];
  getCustomerId(): string;
  getDeliveryDays(): number;
}

class StandardOrder implements IOrder {
  private _id: string | undefined;
  private _customerId: string;
  private _customerAddress: string;
  private _productIds: string[];

  constructor(orderData: OrderRawData) {
    const { customer, id, productIds } = orderData;

    this._id = id;
    this._customerId = customer.getIdentifier();
    this._customerAddress = customer.getAddress();
    this._productIds = productIds;
  }

  getProductIds() {
    return this._productIds;
  }

  getCustomerId() {
    return this._customerId;
  }

  getDeliveryDays() {
    return 3;
  }
}

class PremiumOrder implements IOrder {
  private _id: string | undefined;
  private _customerId: string;
  private _customerAddress: string;
  private _productIds: string[];

  constructor(orderData: OrderRawData) {
    const { customer, id, productIds } = orderData;

    this._id = id;
    this._customerId = customer.getIdentifier();
    this._customerAddress = customer.getAddress();
    this._productIds = productIds;
  }

  getProductIds() {
    return this._productIds;
  }

  getCustomerId() {
    return this._customerId;
  }

  getDeliveryDays() {
    return 1;
  }
}

const printDeliveryDays = (order: IOrder) => console.log(order.getDeliveryDays());

// Priority orders have 1 day delivery
class Customer implements ICustomer {
  private _subscriptionType: "premium" | "standard";

  constructor(subscriptionType: "premium" | "standard") {
    this._subscriptionType = subscriptionType;
  }

  getAddress(): string {
    return "";
  }

  getIdentifier(): string {
    return "";
  }

  hasPremiumSubscription(): boolean {
    return this._subscriptionType === "premium";
  }
}

const orderFactory = (orderData: OrderRawData): IOrder => {
  if (orderData.customer.hasPremiumSubscription()) {
    return new PremiumOrder(orderData);
  } else {
    return new StandardOrder(orderData);
  }
};

const standard = orderFactory({
  id: "123",
  customer: new Customer("standard"),
  productIds: [],
});

const premium = orderFactory({
  id: "123",
  customer: new Customer("premium"),
  productIds: [],
});

printDeliveryDays(standard);
printDeliveryDays(premium);

export {};
