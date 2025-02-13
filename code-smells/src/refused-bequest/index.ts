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

class Vehicle {
  private _tank: Tank;
  private _kmsPerLiter: number;

  constructor(tank: Tank, kmsPerLiter?: number) {
    this._tank = tank;
    this._kmsPerLiter = kmsPerLiter || 10;
  }

  fillTank(liters: number) {
    this._tank.fill(liters);
  }

  move(kilometers: number) {
    const consumedFuel = kilometers / this._kmsPerLiter;
    this._tank.consume(consumedFuel);
  }
}

class Car extends Vehicle {
  constructor(tankCapacity: number, kmsPerLiter: number) {
    super(new Tank(tankCapacity), kmsPerLiter);
  }
}

class Truck extends Vehicle {
  constructor(tankCapacity: number, kmsPerLiter: number) {
    super(new Tank(tankCapacity), kmsPerLiter);
  }
}

// What happens when we want to create a Bicycle?

export {};
