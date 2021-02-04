function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

// This is a decorator, which will execute when the function is defined - so not when it is initialized
@Logger
class Person {
  name = "Morten";

  constructor() {
    console.log("Creating person object...");
  }
}

const newPerson1 = new Person();

console.log(newPerson1);

// Decorator factory - this needs to be executed when it is assigned
// This gives the possibility to pass parameters to the decorator
console.log("Factory..........");
function Logger2(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@Logger2("LOGGING - PERSON")
class Person2 {
  name = "Morten";

  constructor() {
    console.log("Creating person object...");
  }
}

// A more functional decorator
console.log("More functional..........");
function WithTemplate(template: string, hookId: string) {
  console.log("Rendering Now");
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      document.querySelector("h2")!.textContent = p.name;
    }
  };
}

@WithTemplate("<h1>My Person Object</h1>", "app")
class Person3 {
  name = "Morten";

  constructor() {
    console.log("Creating person object...");
  }
}

// With multiple factory decorators the function in the decorator factory will be execute bottom up
// The actual decorator will be executed top down.
console.log("Multiple decorators..........");

@Logger2("LOGGING - PERSON")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person4 {
  name = "Morten";

  constructor() {
    console.log("Creating person object...");
  }
}

// Property decorators
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target, propertyName);
}

// Accessor decorator
function Log2(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// Method decorator
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// Parameter decorator
function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

// Returning something from a decorator
console.log("Decorator with return..........");
function WithTemplate2(template: string, hookId: string) {
  return function <T extends { new (...agrs: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("Rendering Now2");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          document.querySelector("h3")!.textContent = this.name;
        }
      }
    };
  };
}

@Logger2("LOGGING - RETURN")
@WithTemplate2("<h1>My Person Object</h1>", "app")
class Person5 {
  name = "Bolette";

  constructor() {
    console.log("Creating person5 object...");
  }
}

// The content of WithTemplate2 will only be executed when the class is instantiated
const newPerson5 = new Person5();

// Example of an auto bind decorator
function AutoBind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    // The get function will always be bound the to original method and this will therefore refer to it
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "this works!";

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);

// Validator decorator
interface ValidatorConfig {
  [property: string]: {
    [validators: string]: string[];
  };
}

const registeredValidators: ValidatorConfig = {};

function required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }

  let isValid = true;

  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];

        case "positive":
          isValid = isValid && obj[prop] > 0;
      }
    }
  }
  return isValid;
}

class Course {
  @required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }

  console.log(createdCourse);
});
