interface Printable {
  toString(): string;
}

class Customer implements Printable {
  private _firstName: string;
  private _lastName: string;

  constructor(firstName: string, lastName: string) {
    this._firstName = firstName;
    this._lastName = lastName;
  }

  toString(): string {
    return `${this._firstName} ${this._lastName}`;
  }
}

class Product implements Printable {
  private _title: string;
  private _price: number;

  constructor(title: string, price: number) {
    this._title = title;
    this._price = price;
  }

  toString(): string {
    return this._title;
  }
}

const logObject = (obj: Printable) => {
  console.log(`[logObject] : ${obj.toString()}`);
};

logObject(new Product("product", 10));
logObject(new Customer("first", "last"));
export {};
