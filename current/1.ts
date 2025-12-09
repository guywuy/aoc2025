import { logAnswerCheck } from "../utils.ts";

const text = await Deno.readTextFile("current/input.txt");
const data = text
  .trim()
  .split("\n")
  .map((l) => l.split(",").map((i) => parseInt(i, 10)));

let answer = 0;

data.forEach((pos, index) => {
  data.forEach((pos2, index2) => {
    if (index !== index2) {
      const diffX = Math.abs(pos[0] - pos2[0]) + 1;
      const diffY = Math.abs(pos[1] - pos2[1]) + 1;
      const area = diffX * diffY;
      answer = Math.max(answer, area);
    }
  });
});

console.log("----");
console.log(answer);
console.log("----");

logAnswerCheck(answer, 50);
