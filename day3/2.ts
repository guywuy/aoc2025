import { logAnswerCheck, numbersToString, sumInts } from "../utils.ts";

const text = await Deno.readTextFile("input.txt");
const data = text
  .trim()
  .split("\n")
  .map((l) => l.split("").map((i) => parseInt(i)));

const tops = data.reduce((collection, line) => {
  const maxs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let posMax = 0;

  for (let index = 0; index < maxs.length; index++) {
    let max = line.at(posMax)!;
    const searchFrom = posMax;
    const searchUntil = line.length - (maxs.length - (index + 1));
    let match = searchFrom;
    for (let i = searchFrom; i < searchUntil; i++) {
      const val = line.at(i)!;
      if (val > max) {
        max = val;
        match = i;
      }
      posMax = match + 1;
    }
    maxs[index] = max;
  }

  return [...collection, parseInt(`${numbersToString(maxs)}`)];
}, []);

const answer = sumInts(tops);
console.log("----");
console.log(answer);
console.log("----");

logAnswerCheck(answer, 3121910778619);
