let userInput: unknown;
let userName: string;

userInput = "Morten";

// userName = userInput; // This is not allowed given that typescript won't be able to guarantee that userInput is a string
if (typeof userInput === "string") {
  userName = userInput;
}

function generateError(message: string, code: number): never {
  // To show that this will never return anything
  throw { message: message, errorCode: code };
}

generateError("An error occurred", 500);
