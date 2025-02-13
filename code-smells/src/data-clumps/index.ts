class Product {
  private _id: string;
  private _description: string;
  private _boxWidth: number;
  private _boxHeight: number;
  private _boxDepth: number;

  constructor(id: string, desc: string, boxWidth: number, boxHeight: number, boxDepth: number) {
    this._id = id;
    this._description = desc;
    this._boxWidth = boxWidth;
    this._boxHeight = boxHeight;
    this._boxDepth = boxDepth;
  }

  getIdentifier() {
    return this._id;
  }
  getDescription() {
    return this._description;
  }
  getBoxWidth() {
    return this._boxWidth;
  }
  getBoxHeight() {
    return this._boxHeight;
  }
  getBoxDepth() {
    return this._boxDepth;
  }
}

export {};
