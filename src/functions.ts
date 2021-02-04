function add3(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number): void {
  console.log("Result: " + num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

printResult(add3(20, 52));

let combineValues: (a: number, b: number) => number;

combineValues = add3;
// combineValues = printResult; // This will give an error, given that the function does not match with the function type
// combineValues = 5; // this will give an error, given that it is not a function;

console.log(combineValues(3, 10));

addAndHandle(10, 20, (result) => {
  console.log(result);
});
