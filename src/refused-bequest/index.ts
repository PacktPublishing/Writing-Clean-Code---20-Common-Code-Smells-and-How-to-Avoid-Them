class Tank {
  private _capacity: number;
  private _currentLiters: number;

  constructor(capacity: number, currentLiters?: number) {
    this._capacity = capacity;
    this._currentLiters = currentLiters || 0;
  }

  fill(liters: number) {
    this._currentLiters += liters;
  }

  consume(liters: number) {
    this._currentLiters -= liters;
  }
}

interface HasTank {
  fillTank(liters: number): void;
}

interface Movable {
  move(kilometers: number): void;
}

class VehicleWithTank implements HasTank, Movable {
  private _tank: Tank;
  private _kmsPerLiter: number;

  constructor(tankCapacity: number, kmsPerLiter: number) {
    this._tank = new Tank(tankCapacity);
    this._kmsPerLiter = kmsPerLiter;
  }

  fillTank(liters: number) {
    this._tank.fill(liters);
  }

  move(kilometers: number) {
    const consumedFuel = kilometers / this._kmsPerLiter;
    this._tank.consume(consumedFuel);
  }
}

class VehicleWithoutTank implements Movable {
  constructor() {}

  move(kilometers: number) {
    console.log("We are eco-friendly!");
  }
}

const myBike = new VehicleWithoutTank();
const car = new VehicleWithTank(100, 10);
const truck = new VehicleWithTank(1000, 15);

// What happens when we want to create a Bicycle?

export {};
