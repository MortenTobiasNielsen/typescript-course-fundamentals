//----------------------------------------------------------------------------------
// Example of intersection types
//----------------------------------------------------------------------------------

// This could also be done with interfaces
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Morten",
  privileges: ["Create servers"],
  startDate: new Date(),
};

// This can also be used with union types
type Combinable = string | number;
type Numeric = number | boolean;

// This will give all the types - in this case string, number and boolean
type Universal = Combinable | Numeric;

// This will give what they have in common - in this case number
type CommonType = Combinable & Numeric;

//----------------------------------------------------------------------------------
// Examples of type guards
//----------------------------------------------------------------------------------
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);

  if ("privileges" in emp) {
    console.log("privileges: " + emp.privileges);
  }

  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}

printEmployeeInformation(e1);

// class type guard
class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving Truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading Cargo: " + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

//----------------------------------------------------------------------------------
// Example of Discriminated Unions
//----------------------------------------------------------------------------------

interface Bird {
  type: "bird"; // Discriminator
  flyingSpeed: number;
}

interface Horse {
  type: "horse"; // Discriminator
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed: number;

  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;

    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("moving with speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

//----------------------------------------------------------------------------------
// Example of type casting
//----------------------------------------------------------------------------------

// Tells typescript that we know it exists
const paragraph = document.querySelector("p")!;

// Tells typescript that this will be a paragraph element
const paragraphId = <HTMLParagraphElement>(
  document.getElementById("message-output")
);

// Alternative which is needed in react and react native
const userInput1 = document.getElementById("user-input") as HTMLInputElement;

userInput1.value = "Hi there!";

// If you cannot be sure, that the element is present you can do this
const userInput2 = document.getElementById("user-input");

if (userInput2) {
  (userInput2 as HTMLInputElement).value = "Hi there!";
}

//----------------------------------------------------------------------------------
// Example of index properties
//----------------------------------------------------------------------------------
interface ErrorContainer {
  id: string;
  // id: number; // This is not allowed given that the index property is string
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  id: "1",
  email: "Not a valid email",
  username: "Must start with a capital character!",
};

//----------------------------------------------------------------------------------
// Example of function overload
//----------------------------------------------------------------------------------

type Combinable1 = string | number;
type Numeric1 = number | boolean;

type Universal1 = Combinable1 | Numeric;

type CommonType1 = Combinable1 & Numeric;

function add2(a: number, b: number): number;
function add2(a: string, b: string): string;
function add2(a: Combinable1, b: Combinable1) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result1 = add2(1, 5); // Typescript knows this will return a number
const result2 = add("Morten", "Bolette"); // Typescripts knows this will return a string

//----------------------------------------------------------------------------------
// Example of option chaining & nullish coalescing
//----------------------------------------------------------------------------------

const fetchedUserData = {
  id: "u1",
  name: "Morten",
  job: { title: "CEO", description: "My own company" },
};

// This way makes it possible to first check if job is available
// Only if that is the case it will try to access title
console.log(fetchedUserData.job && fetchedUserData.job.title);

// This does the same
console.log(fetchedUserData?.job?.title);

const NotSureThisIsNull = null;

// This will only happen if it is null or undefined
// This will not happen on other falsy types like an empty string
const storedData = NotSureThisIsNull ?? "DEFAULT";
