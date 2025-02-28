// Example: unnecessarily complex methods
const add = (a: number, b: number) => a + b;
const subtract = (a: number, b: number) => a - b;

const buildSerialOperation = (operation: (a: number, b: number) => number) => {
  console.log("Operation: ", operation);
  return (...args: number[]) => {
    return args.reduce(operation);
  };
};

const serialAdd = buildSerialOperation(add);
const serialSubtract = buildSerialOperation(subtract);

console.log(serialAdd(1, 2));
console.log(serialAdd(1, 2, 3, 4));

// Example: unnecessary operations implemented in the calculator class
class Calculator {
  private _currentValue: number;

  constructor(initialValue: number) {
    this._currentValue = initialValue;
  }

  add(value: number) {
    this._currentValue += value;
    return this;
  }

  subtract(value: number) {
    this._currentValue -= value;
    return this;
  }

  multiplyBy(value: number) {
    this._currentValue *= value;
    return this;
  }

  divideBy(value: number) {
    this._currentValue /= value;
    return this;
  }

  printTotal() {
    console.log(`TOTAL: ${this._currentValue}`);
  }
}

const calculator = new Calculator(10);

calculator.add(10).subtract(15).multiplyBy(2).divideBy(5).printTotal();

export {};
