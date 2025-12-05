import { logAnswerCheck } from "../utils.ts";

const text = await Deno.readTextFile("current/input.txt");
const data = text
  .trim()
  .split("\n")
  .map((l) => l.split(""));

const printGrid = (grid: string[][]) => {
  console.log(grid.map((r) => r.join("")).join("\n"));
};

let answer = 0;

const getSurroundings = (grid: string[][], x: number, y: number) => [
  y > 0
    ? [
        grid.at(y - 1)?.at(x - 1),
        grid.at(y - 1)?.at(x),
        grid.at(y - 1)?.at(x + 1),
      ]
    : [],
  [grid.at(y)?.at(x + 1), x > 0 ? grid.at(y)?.at(x - 1) : undefined],
  [
    grid.at(y + 1)?.at(x + 1),
    grid.at(y + 1)?.at(x),
    x > 0 ? grid.at(y + 1)?.at(x - 1) : undefined,
  ],
];

let finished = false;

const latestGrid = data.map((row) => [...row]);
while (!finished) {
  let removedThisRound = 0;
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      const position = latestGrid[y][x];
      const surrounds = getSurroundings(latestGrid, x, y);
      const filtered = surrounds.flat().filter((item) => item === "@");
      const numSpaces = 8 - filtered.length;
      if (position === "@" && numSpaces > 4) {
        latestGrid[y][x] = "x";
        removedThisRound++;
      }
    }
  }
  printGrid(latestGrid);
  console.log({ removedThisRound });
  answer += removedThisRound;
  if (removedThisRound === 0) {
    finished = true;
  }
}

console.log("----");
console.log(answer);
console.log("----");

logAnswerCheck(answer, 43);
