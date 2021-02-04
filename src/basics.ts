function add1(n1: number, n2: number, showResult: boolean, phrase: string) {
  if (showResult) {
    const result = n1 + n2;
    return phrase + result;
  }
  return null;
}

const number1 = 5;
const number2 = 2.8;
const printResult1 = true;
const resultPhrase = "Result is: ";

const result = add1(number1, number2, printResult1, resultPhrase);

console.log(result);
