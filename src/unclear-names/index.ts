type CustomerRawData = {
  fullName: string;
  mobilePhone?: string;
};

class Customer {
  private readonly fullName: string;
  private readonly mobilePhone?: string;

  constructor(customerData: CustomerRawData) {
    this.fullName = customerData.fullName;
    this.mobilePhone = customerData.mobilePhone;
  }

  getFullName(): string {
    return this.fullName;
  }

  getMobilePhone(): string | undefined {
    return this.mobilePhone;
  }
}

class Cart {
  private _customer: Customer;
  private _productIds: string[] = [];

  constructor(cartCustomer: Customer) {
    this._customer = cartCustomer;
  }

  addProduct(newProductId: string) {
    this._productIds = [...this._productIds, newProductId];
  }
}

const customer = new Customer({ fullName: "John Smith", mobilePhone: "1234" });
const cartFromJohn = new Cart(customer);
const jane = new Customer({ fullName: "Jane Smith", mobilePhone: "2345" });

console.log(customer.getFullName());
console.log(jane.getMobilePhone());

export {};
