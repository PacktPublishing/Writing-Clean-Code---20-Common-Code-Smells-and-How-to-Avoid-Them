type CustomerRawData = {
  name: string;
  phone?: string;
};

class Customer {
  private readonly name: string;
  private readonly phone?: string;

  constructor(rawData: CustomerRawData) {
    this.name = rawData.name;
    this.phone = rawData.phone;
  }

  getName(): string {
    return this.name;
  }

  getPhone(): string | undefined {
    return this.phone;
  }
}

class Cart {
  private _cust: Customer;
  private _pIds: string[] = [];

  constructor(c: Customer) {
    this._cust = c;
  }

  addProduct(pId: string) {
    this._pIds = [...this._pIds, pId];
  }
}

const c1 = new Customer({ name: "John", phone: "1234" });
const c2 = new Cart(c1);
const c3 = new Customer({ name: "Jane", phone: "2345" });

console.log(c1.getName()); // Is this first name? Or last name? Or full name?
console.log(c3.getPhone()); // Is this the mobile phone? Or business phone?

export {};
