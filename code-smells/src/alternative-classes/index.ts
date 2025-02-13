class Customer {
  private _firstName: string;
  private _lastName: string;

  constructor(firstName: string, lastName: string) {
    this._firstName = firstName;
    this._lastName = lastName;
  }

  getFullName() {
    return `${this._firstName} ${this._lastName}`;
  }
}

class Product {
  private _title: string;
  private _price: number;

  constructor(title: string, price: number) {
    this._title = title;
    this._price = price;
  }

  getTitle() {
    return this._title;
  }
}

const logCustomer = (cust: Customer) => {
  console.log(`[logObject] : ${cust.getFullName()}`);
};

const logProduct = (prod: Product) => {
  console.log(`[logObject] : ${prod.getTitle()}`);
};

export {};
