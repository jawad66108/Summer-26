import { divideNumbers } from "./func.js";

try {
  console.log("Ans: ", divideNumbers(10, 2));
} catch (err) {
  console.log(err);
} finally {
  console.log("Operation completed....");
}
