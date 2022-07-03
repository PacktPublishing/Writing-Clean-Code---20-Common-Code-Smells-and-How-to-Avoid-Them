interface Customer {
  getIdentifier(): string;
  getAddress(): string;
  hasPremiumSubscription(): boolean;
}

class Order {
  private _id: string;
  private _customerId: string;
  private _customerAddress: string;
  private _hasPriority: boolean;
  private _productIds: string[];

  constructor(
    id: string,
    customerId: string,
    customerAddress: string,
    productIds: string[],
    isPremiumCustomer: boolean
  ) {
    this._id = id;
    this._customerId = customerId;
    this._customerAddress = customerAddress;
    this._productIds = productIds;
    this._hasPriority = isPremiumCustomer;
  }

  getProductIds() {
    return this._productIds;
  }

  getCustomerId() {
    return this._customerId;
  }
}

export {};
