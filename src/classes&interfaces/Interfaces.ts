interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: "Morten",
  age: 31,
  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  },
};

user1.greet("Hi there - My name is");

interface Named {
  readonly name: string; // You can add readonly, but not private or protected
  outputName?: string; // This is optional to implement
}

// Interfaces can be extended like classes
interface Greetable extends Named {
  greet(phrase: string): void;
}

// Example of implementing an interface on a class
class Dog implements Greetable {
  constructor(public name: string) {}

  greet(phrase: string) {
    console.log(phrase + this.name);
  }
}

const newDog = new Dog("Lassie");
newDog.greet("Who is a good dog: ");

// This can also be done with interfaces
type AddFn = (a: number, b: number) => number;

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

// Like this as a custom function type
interface AddFn2 {
  (a: number, b: number): number;
}

let add2: AddFn2;

add2 = (n1: number, n2: number) => {
  return n1 + n2;
};
