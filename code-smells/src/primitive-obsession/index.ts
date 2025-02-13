import { v4 as uuidV4 } from "uuid";

class Customer {
  private _id: string;
  private _name: string;
  private _address: string;
  private _phone: string;
  private _email: string;
  private readonly EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  private readonly PHONE_REGEX = /\d{2}\ \d{8}/;

  constructor(name: string, address: string, phone: string, email: string, id?: string) {
    this._id = id || uuidV4();
    this._name = name;
    this._address = address;
    this._phone = phone;
    this._email = email;
  }

  isEmailValid() {
    return this.EMAIL_REGEX.test(this._email);
  }

  isPhoneValid() {
    return this.PHONE_REGEX.test(this._phone);
  }

  getPhoneAreaCode() {
    return this._phone.split(" ")[0];
  }

  getPhoneNumber() {
    return this._phone.split(" ")[1];
  }
}

export {};
