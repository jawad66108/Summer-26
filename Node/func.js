export function divideNumbers(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  else return a / b;
}
