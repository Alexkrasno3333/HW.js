
//hw22
const university = {
  universityName: "My Own university",
  dean: "Bohdan",
};
const faculty = Object.create(university, {
  facultyName: {
    value: "cs",
    enumerable: true,
  },
  groups: {
    value: [],
    enumerable: true,
  },
  enlistStudent: {
    value: function (studentName) {
      const lastGroup = this.groups[this.groups.length - 1] || [];
      if (lastGroup.length !== 12) {
        lastGroup.push(studentName);
        if (!this.groups.length) {
          this.groups.push(lastGroup);
        }
      } else {
        this.groups.push([studentName]);
      }
    },
  },
});


function Shape(color) {
  this.color = color;
}
Shape.prototype.getColor = function () {
  return this.color;
};

function Rectangle(color, width, height) {
  Shape.call(this, color);
  this.width = width;
  this.height = height;
  this.area;
}
function Circle(color, radius) {
  Shape.call(this, color);
  this.radius = radius;
  this.area;
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;
Circle.prototype.getArea = function () {
  return (Math.PI * this.radius ** 2).toFixed(2);
};

const square = new Rectangle("green", 8, 8);
const rectangle = new Rectangle("blue", 6, 3);
square.getArea();
rectangle.getArea();
const circle = new Circle("yellow", 4);
circle.getArea();


const fibonacci = (n) => {
  return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};


const fibonacciWithCache = (n, cache) => {
  if (!cache.has(n)) {
    if (n <= 1) {
      cache.set(n, 1);
    } else {
      const result =
        fibonacciWithCache(n - 1, cache) + fibonacciWithCache(n - 2, cache);
      cache.set(n, result);
    }
  }
  return cache.get(n) || 1;
};
const caches = (func) => {
  const map = new Map();
  return (n) => {
    if (!map.has(n)) {
      func(n, map);
    }
    return map.get(n);
  };
};
const fibFunc = caches(fibonacciWithCache);  
//23hw
class Vehicle {
  constructor(power, gasTank, mass) {
    this.power = power;
    this.gasTank = gasTank;
    this.mass = mass;
    this.started = false;
  }

  getMaxSpeed() {
    return 0.84 * this.power / this.mass;
  }

  getGasUsage() {
    return Math.round(this.getMaxSpeed() / this.power * 100);
  }

  startEngine() {
    this.started = true;
  }

  stopEngine() {
    this.started = false;
  }

  drive(speed, distance) {
    if (!this.started) {
      console.log("Cannot drive, engine not started.");
      return;
    }
    const maxSpeed = this.getMaxSpeed();
    if (speed > maxSpeed || speed < 0) {
      console.log(`Invalid speed, must be between 0 and ${maxSpeed}.`);
      return;
    }
    const gasUsage = this.getGasUsage();
    const gasNeeded = distance * gasUsage / 100;
    if (gasNeeded > this.gasTank) {
      console.log("Not enough gas.");
      return;
    }
    this.gasTank -= gasNeeded;
    console.log(`Driving at ${speed} km/h for ${distance} km using ${gasNeeded.toFixed(2)} liters of gas.`);
  }

  addGas(gas) {
    if (gas <= 0) {
      console.log("Invalid amount of gas.");
      return;
    }
    if (this.gasTank + gas > this.gasTank) {
      console.log("Cannot pour more gas than tank capacity.");
      return;
    }
    this.gasTank += gas;
    console.log(`Added ${gas.toFixed(2)} liters of gas. Gas tank now has ${this.gasTank.toFixed(2)} liters.`);
  }

  printInfo() {
    console.log(`Vehicle - power: ${this.power}, gasTank: ${this.gasTank}, mass: ${this.mass}, started: ${this.started}`);
  }
}

class Car extends Vehicle {
  constructor(power, gasTank, mass, type, maxPassengerCount) {
    super(power, gasTank, mass);
    this.type = type;
    this.maxPassengerCount = maxPassengerCount;
    this.passengerCount = 0;
  }

  updatePassengerCount(passengerCount) {
    if (passengerCount < 0 || passengerCount > this.maxPassengerCount) {
      console.log(`Invalid passenger count, must be between 0 and ${this.maxPassengerCount}.`);
      return;
    }
    this.passengerCount = passengerCount;
  }

  printInfo() {
    console.log(`Car - power: ${this.power}, gasTank: ${this.gasTank}, mass: ${this.mass}, started: ${this.started}, type: ${this.type}, maxPassengerCount: ${this.maxPassengerCount}, passengerCount: ${this.passengerCount}`);
  }
}

class Bus extends Car {
  constructor(power, gasTank, mass, type, maxPassengerCount) {
    super(power, gasTank, mass, type, maxPassengerCount);
  }

  updatePassengerCount(passengerCount) {
    super.updatePassengerCount(passengerCount);
  }

  printInfo() {
    console.log(`Bus - power: ${this.power}, gasTank: ${this.gasTank}, mass: ${this.mass}, started: ${this.started}, type: ${this.type}, maxPassengerCount: ${this.maxPassengerCount}, passengerCount: ${this.passengerCount}`);
  }
}
//21hw
// ## Closure

function calculate(initialValue) {
  let currentValue = initialValue;

  return {
    add(n) {
      currentValue += n;
      return currentValue;
    },
    subtract(n) {
      currentValue -= n;
      return currentValue;
    },
    multiply(n) {
      currentValue *= n;
      return currentValue;
    },
    divide(n) {
      currentValue /= n;
      return currentValue;
    },
    reset() {
      currentValue = 0;
      return currentValue;
    },
  };
}

// ## Decorator

const obj = {
  num: 1,
  sum(num) {
    return this.num + num;
  },
};

const cachesDecorator = (func) => {
  const map = new Map();
  return function (num) {
    if (!map.has(num)) {
      const result = func.call(this, num);
      map.set(num, result);
    }
    return map.get(num);
  };
};

const sum = function (num) {
  return this.num + num;
};

const decoratedSum = cachesDecorator(sum);
console.log(decoratedSum.call(obj, 2));
console.log(decoratedSum.call(obj, 2));

const decoratedSum2 = cachesDecorator(obj.sum);
console.log(decoratedSum.call(obj, 3));
console.log(decoratedSum.call(obj, 3));
console.log(decoratedSum.call(obj, 33));

// ## Factorial recursion (optional)

const factorial = (initialNumber) => {
  return initialNumber === 2
    ? initialNumber
    : initialNumber * factorial(initialNumber - 1);
};

// const user = {};
// const number1 = 2;
// const number2 = 2;
// const arr = [1, 2];

// function bazz(first, last) {
//   const arr = [];
//   const number1 = 22;
//   const number2 = 22;
//   const bar = () => {
//     const number2 = 3;
//     return function () {
//       debugger;
//       const xxxx = {};
//       return number1 + number2 + number1;
//     };
//   };

//   const foo = bar();
//   return foo();
// }

// bazz();

let bazz = function () {
  let counter = 0;

  return function (n) {
   
    counter = counter + n;
    return counter;
  };
};

const innerFunc = bazz();
const innerFunc2 = bazz();

function myFirstRecursion(from, to) {
  if (from === to) {
    return to;
  }
  const result = myFirstRecursion(from, to - 1);
  console.log("result", result);
  console.log("to", to);
  return result + to;
}

function fromTo(from, to) {
  let value = to;
  let sum = 0;
  while (true) {
    if (from === value) {
      sum += value;
      break;
    } else {
      sum += value;
      value--;
    }
  }
  return sum;
}

myFirstRecursion(2, 5);
function getDaysInYear(year) {
  return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) ? 366 : 365;
}
console.log(getDaysInYear(1764));
getDaysInYear();

function getDayNumber(dateString) {
  const date = new Date(dateString);
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}
getDayNumber("2023-01-12"); 
getDayNumber("2023-02-26");
console.log(getDayNumber("2023-01-12"));
console.log(getDayNumber("2023-02-26"));

const monthsArr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const quarters=["I", "II", "III", "IV"]
const getQuarters = (date) => {
  const dateObj = new Date(date);
  const month = monthsArr[dateObj.getMonth()];
  const day = dateObj.getDate();
  const quarter = quarters[Math.floor(dateObj.getMonth() / 3)];

  return `${month} ${day} is ${quarter} quarter`;
};



const createMap = (arr = []) => {
  const map = new Map();

  arr.forEach((obj) => {
    map.set(obj.id, obj);
  });

  return map;
};
createMap([
  { id: 1, value: 1, date: "2022-02-15" },
  { id: 2, value: 1242, date: "2023-02-15" },
  { id: 3, value: 3342, date: "2021-02-15" },
]);


const cache = new Map();
const cacheCalcDateDiff = (startDate, endDate) => {
  const key = `${startDate}-${endDate}`;
  if (cache.has(key)) {
    cache.get(key);
  } else {
    cache.set(key, calcDateDiff(startDate, endDate));
  }
};

