import { v4 as uuidV4 } from "uuid";

type CustomerRawData = {
  name: string;
  address: string;
  phone: string;
  email: string;
  id?: string;
};

class Email {
  private _emailValue: string;
  private readonly EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  constructor(emailValue: string) {
    this._emailValue = emailValue;
  }

  isValid() {
    return this.EMAIL_REGEX.test(this._emailValue);
  }
}

class Phone {
  private _areaCode: string;
  private _phoneNumber: string;

  constructor(phoneValue: string) {
    const phoneComponents = phoneValue.split(" ");
    this._areaCode = phoneComponents[0];
    this._phoneNumber = phoneComponents[1];
  }

  isValid() {
    return this._areaCode.length === 2 && this._phoneNumber.length === 8;
  }

  getAreaCode() {
    return this._areaCode;
  }

  getNumber() {
    return this._phoneNumber;
  }
}

class Customer {
  private _id: string;
  private _name: string;
  private _address: string;
  private _phone: Phone;
  private _email: Email;

  constructor(customerData: CustomerRawData) {
    const { name, address, phone, email, id } = customerData;

    this._id = id || uuidV4();
    this._name = name;
    this._address = address;
    this._phone = new Phone(phone);
    this._email = new Email(email);
  }

  getEmail() {
    return this._email;
  }

  getPhone() {
    return this._phone;
  }
}

const myCustomer = new Customer({
  name: "Lauro",
  address: "Street 123",
  phone: "12 34567890",
  email: "lauro@example.com",
});

console.log(myCustomer.getEmail().isValid());
console.log(myCustomer.getPhone().isValid());
console.log(myCustomer.getPhone().getAreaCode());

export {};
