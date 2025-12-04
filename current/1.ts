import { logAnswerCheck } from "../utils.ts";

const text = await Deno.readTextFile("input-test.txt");
const data = text
  .trim()
  .split("\n")
  .map((l) => l.split(""));

let answer = 0;

// Need to change to not access negative [-indices] e.g [-1]
const getSurroundings = (x: number, y: number) => [
  [data.at(y - 1)?.at(x - 1), data.at(y - 1)?.at(x), data.at(y - 1)?.at(x + 1)],
  [data.at(y)?.at(x + 1), data.at(y)?.at(x - 1)],
  [
    data.at(y + 1)?.at(x + 1),
    data.at(y + 1)?.at(x + 1),
    data.at(y + 1)?.at(x - 1),
  ],
];

for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data[y].length; x++) {
    // const position = data[y][x];
    console.log(x, y);
    const surrounds = getSurroundings(x, y);
    console.log(surrounds);
    const numSpaces = surrounds.flat().filter((item) => item !== "@").length;
    if (numSpaces > 4) {
      console.log('---spaces around', surrounds);
      answer++;
    }
  }
}

// console.log(grid);
console.log("----");
console.log(answer);
console.log("----");

logAnswerCheck(answer, 13);
