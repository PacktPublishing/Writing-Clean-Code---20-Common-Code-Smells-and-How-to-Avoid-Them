// Example: unnecessarily complex methods
const add = (...args: number[]) => {
  return args.reduce((prev, curr) => prev + curr, 0);
};

console.log(add(1, 2));
console.log(add(1, 2, 3, 4));

// Example: unnecessary operations implemented in the calculator
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

  log10(value: number) {
    this._currentValue = Math.log10(this._currentValue);
  }

  power(value: number) {
    this._currentValue = Math.pow(this._currentValue, value);
  }

  printTotal() {
    console.log(`TOTAL: ${this._currentValue}`);
  }
}

const calculator = new Calculator(10);

calculator.add(10).subtract(15).multiplyBy(2).divideBy(5).printTotal();

export {};
