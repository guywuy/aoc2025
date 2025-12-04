import { sumInts } from "../utils.ts";

const text = await Deno.readTextFile("input.txt");
const data = text
  .trim()
  .split("\n")
  .map((l) => l.split("").map((i) => parseInt(i)));

const tops = data.reduce((collection, line) => {
  let max1 = line.at(0)!;
  let posMax1 = 0;
  for (let i = 1; i < line.length - 1; i++) {
    const val = line.at(i)!;
    if (val > max1) {
      max1 = val;
      posMax1 = i;
    }
  }

  let max2 = line.at(posMax1 + 1)!;
  for (let j = posMax1 + 1; j < line.length; j++) {
    const val = line.at(j)!;
    if (val > max2) {
      max2 = val;
    }
  }
  return [...collection, parseInt(`${max1}${max2}`)];
}, []);

const answer = sumInts(tops);
console.log(tops);
console.log("----");
console.log(answer);
console.log("----");
