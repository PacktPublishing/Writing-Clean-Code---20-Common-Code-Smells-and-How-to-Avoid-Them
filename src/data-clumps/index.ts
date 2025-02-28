type DimensionsRawData = {
  width: number;
  height: number;
  depth: number;
  unit?: "m" | "cm";
};

class Dimensions {
  private _width: number;
  private _height: number;
  private _depth: number;
  private _unit: "m" | "cm";

  constructor({ width, height, depth, unit = "cm" }: DimensionsRawData) {
    this._width = width;
    this._height = height;
    this._depth = depth;
    this._unit = unit;
  }

  getWidth() {
    return this._width;
  }

  getHeight() {
    return this._height;
  }

  getDepth() {
    return this._depth;
  }
}

type ProductRawData = {
  id: string;
  description: string;
  dimensions: Dimensions;
};

class Product {
  private _id: string;
  private _description: string;
  private _dimensions: Dimensions;

  constructor({ id, description, dimensions }: ProductRawData) {
    this._id = id;
    this._description = description;
    this._dimensions = dimensions;
  }

  getIdentifier() {
    return this._id;
  }
  getDescription() {
    return this._description;
  }
  getBoxDimensions() {
    return this._dimensions;
  }
}

new Product({
  id: "123",
  description: "A small product",
  dimensions: new Dimensions({
    width: 10,
    height: 10,
    depth: 10,
  }),
});

export {};
