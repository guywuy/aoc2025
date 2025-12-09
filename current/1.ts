import { logAnswerCheck } from "../utils.ts";

const text = await Deno.readTextFile("current/input-test.txt");
const data = text
  .trim()
  .split("\n")
  .map((l) => l.split(",").map((i) => parseInt(i, 10)));

let answer = 0;

data.forEach((pos, index) => {
  // for each other line, calc area (x * x2 + y * y2);
  // set answer as max(answer, result)
  console.log(pos, index);
  data.forEach((pos2, index2) => {
    if (index !== index2) {
      // console.log(object);
    }
  })
});

console.log("----");
console.log(answer);
console.log("----");

logAnswerCheck(answer, 50);
