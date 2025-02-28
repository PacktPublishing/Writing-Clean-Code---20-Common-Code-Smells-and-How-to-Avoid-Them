interface Operation {
  operate(): number;
  toString(): string;
}

class Add implements Operation {
  private _oldValue: number;
  private _newValue: number;

  constructor(oldValue: number, newValue: number) {
    this._oldValue = oldValue;
    this._newValue = newValue;
  }

  operate(): number {
    return this._oldValue + this._newValue;
  }

  toString(): string {
    return `${this._oldValue} plus ${this._newValue}`;
  }
}

class Subtract implements Operation {
  private _oldValue: number;
  private _newValue: number;

  constructor(oldValue: number, newValue: number) {
    this._oldValue = oldValue;
    this._newValue = newValue;
  }

  operate(): number {
    return this._oldValue - this._newValue;
  }

  toString(): string {
    return `${this._oldValue} minus ${this._newValue}`;
  }
}

class Multiply implements Operation {
  private _oldValue: number;
  private _newValue: number;

  constructor(oldValue: number, newValue: number) {
    this._oldValue = oldValue;
    this._newValue = newValue;
  }

  operate(): number {
    return this._oldValue * this._newValue;
  }

  toString(): string {
    return `${this._oldValue} multiplied by ${this._newValue}`;
  }
}

class Divide implements Operation {
  private _oldValue: number;
  private _newValue: number;

  constructor(oldValue: number, newValue: number) {
    this._oldValue = oldValue;
    this._newValue = newValue;
  }

  operate(): number {
    return this._oldValue / this._newValue;
  }

  toString(): string {
    return `${this._oldValue} divided by ${this._newValue}`;
  }
}

class Calculator {
  private _operations: Operation[] = [];
  private _currentValue: number;

  constructor(initialValue: number) {
    this._currentValue = initialValue;
  }

  private createOperation(operation: string, newValue: number): Operation {
    switch (operation) {
      case "add":
        return new Add(this._currentValue, newValue);
      case "subtract":
        return new Subtract(this._currentValue, newValue);
      case "multiply":
        return new Multiply(this._currentValue, newValue);
      case "divide":
        return new Divide(this._currentValue, newValue);
      default:
        throw new Error("Unsupported operation");
    }
  }

  private execOperation(operation: "add" | "subtract" | "multiply" | "divide", newValue: number) {
    const newOperation = this.createOperation(operation, newValue);
    this._operations.push(newOperation);
    this._currentValue = newOperation.operate();
    return this;
  }

  add(newValue: number) {
    return this.execOperation("add", newValue);
  }

  subtract(newValue: number) {
    return this.execOperation("subtract", newValue);
  }

  multiplyBy(newValue: number) {
    return this.execOperation("multiply", newValue);
  }

  divideBy(newValue: number) {
    return this.execOperation("divide", newValue);
  }

  printOperations() {
    this._operations.forEach((operation) => console.log(operation.toString()));
    console.log("-----------");
    console.log(`Total: ${this._currentValue}`);
  }
}

const calculator = new Calculator(0);

calculator.add(10).add(20).subtract(15).multiplyBy(3).divideBy(2).printOperations();

export {};
