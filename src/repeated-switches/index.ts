class Calculator {
  private _operations: { operation: string; oldValue: number; value: number }[] = [];
  private _currentValue: number;

  constructor(initialValue: number) {
    this._currentValue = initialValue;
  }

  execute(operation: string, newValue: number) {
    switch (operation) {
      case "add":
        this._operations.push({ operation: "add", oldValue: this._currentValue, value: newValue });
        this._currentValue = this._currentValue + newValue;
        return this;
      case "subtract":
        this._operations.push({
          operation: "subtract",
          oldValue: this._currentValue,
          value: newValue,
        });
        this._currentValue = this._currentValue - newValue;
        return this;
      case "multiply":
        this._operations.push({
          operation: "multiply",
          oldValue: this._currentValue,
          value: newValue,
        });
        this._currentValue = this._currentValue * newValue;
        return this;
      case "divide":
        this._operations.push({
          operation: "divide",
          oldValue: this._currentValue,
          value: newValue,
        });
        this._currentValue = this._currentValue / newValue;
        return this;
      default:
        throw new Error("Unsupported operation");
    }
  }

  printOperations() {
    for (const operationObj of this._operations) {
      switch (operationObj.operation) {
        case "add":
          console.log(`${operationObj.oldValue} plus ${operationObj.value}`);
          break;
        case "subtract":
          console.log(`${operationObj.oldValue} minus ${operationObj.value}`);
          break;
        case "multiply":
          console.log(`${operationObj.oldValue} multiplied by ${operationObj.value}`);
          break;
        case "divide":
          console.log(`${operationObj.oldValue} divided by ${operationObj.value}`);
          break;
      }
    }
    console.log("-----------");
    console.log(`Total: ${this._currentValue}`);
  }
}

const calculator = new Calculator(0);

calculator
  .execute("add", 10)
  .execute("add", 20)
  .execute("subtract", 15)
  .execute("multiply", 3)
  .execute("divide", 2)
  .printOperations();

export {};
