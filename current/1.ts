import { logAnswerCheck } from "../utils.ts";

const text = await Deno.readTextFile("current/input-test.txt");
const data = text
  .trim()
  .split("\n")
  .map((l) => l.split(""));

let answer = 0;

const getSurroundings = (x: number, y: number) => [
  y > 0
    ? [
        data.at(y - 1)?.at(x - 1),
        data.at(y - 1)?.at(x),
        data.at(y - 1)?.at(x + 1),
      ]
    : [],
  [data.at(y)?.at(x + 1), x > 0 ? data.at(y)?.at(x - 1) : undefined],
  [
    data.at(y + 1)?.at(x + 1),
    data.at(y + 1)?.at(x),
    x > 0 ? data.at(y + 1)?.at(x - 1) : undefined,
  ],
];

const newGrid = data.map((row) => [...row]);

for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data[y].length; x++) {
    const position = data[y][x];
    const surrounds = getSurroundings(x, y);
    const filtered = surrounds.flat().filter((item) => item === "@");
    const numSpaces = 8 - filtered.length;
    if (position === "@" && numSpaces > 4) {
      newGrid[y][x] = "x";
      answer++;
    }
  }
}

const printGrid = (grid: string[][]) => {
  console.log(grid.map((r) => r.join("")).join("\n"));
};

console.log("----");
console.log(answer);
console.log("----");
printGrid(data);
console.log(" ");
printGrid(newGrid);
console.log("----");

logAnswerCheck(answer, 13);
