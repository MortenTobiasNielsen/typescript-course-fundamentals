const names: Array<string> = [];

// This will give better support given that typescript knows the type the promise returns
const promise: Promise<string> = new Promise((resolve, _reject) => {
  setTimeout(() => {
    resolve("This is done");
  }, 2000);
});

// The data returned will have autocompletion like it was a string.
promise.then((data) => {
  data.split(" ");
});

//----------------------------------------------------------------------------------
// Building generic types, functions and classes
//----------------------------------------------------------------------------------

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

console.log(merge({ name: "Morten" }, { age: 31 }));

const mergedObj = merge({ name: "Morten" }, { age: 31 });
// This is possible due to merge being a generic type
console.log(mergedObj.age);

interface HasLength {
  length: number;
}

// This ensures that the input for T has a length property, otherwise typescript will give an error
function countAndDescribe<T extends HasLength>(element: T): [T, string] {
  let descriptionText = "Got no value";

  if (element.length === 1) {
    descriptionText = "Got 1 element";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(["Hi there"]));

// This ensures that U will be a key of T
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

console.log(extractAndConvert({ name: "Morten" }, "name"));

// This is a class which will work with primitive types
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const TextStorage = new DataStorage<string>();

TextStorage.addItem("Morten");
TextStorage.addItem("Bolette");

console.log(TextStorage.getItems());
TextStorage.removeItem("Morten");
console.log(TextStorage.getItems());

// Utility generics

interface CourseGoal {
  title: string;
  description: string;
  endDate: Date;
}

// The Partial keyword makes all properties of an interface optional
function createCourseGoal(
  title: string,
  description: string,
  endDate: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.endDate = endDate;
  return courseGoal as CourseGoal;
}

const namesStrings: Readonly<string[]> = ["Morten", "Bolette"];
// namesStrings.push("Test") // This is not possible given that nameStrings are Readonly
// namesStrings.pop("Test") // This is not possible given that nameStrings are Readonly
