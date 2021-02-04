const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  // const person = {
  name: "Morten",
  age: 31,
  hobbies: ["Sports", "Cooking"],
  role: [2, "author"],
};

// person.role.push("admin"); // This would be wrong, but is not caught by Typescript, given that push is allowed on tuples
// person.role[1] = 10; // This will be an error
// person.role = [] // This also gives an error, given that the length is not 2.
// person.role = [0, "admin", "user"] // This gives an error for the same reason

let favoriteActivities: string[];
favoriteActivities = ["sports"];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  // hobby.map() // Gives an error given that typescript knows hobby is not an array.
}

// This can be a good way to ensure you always use the same identifier in the code
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const newPerson = {
  name: "Morten",
  age: 31,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

if (newPerson.role === Role.ADMIN) {
  console.log("This user is an admin");
}
