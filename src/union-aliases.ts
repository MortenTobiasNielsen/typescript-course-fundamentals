type Combinable = number | string; // Example of a custom type
type ConversionDescriptor = "as-number" | "as-text";

function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor // Ensures that it is a string and only those two values
) {
  let result;

  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  return result;
}

const combinedAges = combine(20, 26, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("23", "26", "as-number");
console.log(combinedStringAges);

const combinedStringAgesAsText = combine("23", "26", "as-text");
console.log(combinedStringAgesAsText);

const combinedNames = combine("Morten", "Bolette", "as-text");
console.log(combinedNames);
