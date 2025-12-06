import { logAnswerCheck, sumInts } from "../utils.ts";

const text = await Deno.readTextFile("current/input.txt");
const data = text
  .trim()
  .split("\n")
  .map((l) => l.split(/\s+/g).filter((i) => !!i));

const columnTotals = [] as number[];

for (let i = 0; i < data[0].length; i++) {
  const columnOperator = data.at(-1)?.at(i);
  let total = columnOperator === "+" ? 0 : 1;
  for (let rowIndex = 0; rowIndex < data.length - 1; rowIndex++) {
    const value = parseInt(data[rowIndex][i]);
    if (columnOperator === "*") {
      total *= value;
    } else {
      total += value;
    }
  }
  columnTotals.push(total);
}

const answer = sumInts(columnTotals);
console.log(data);
console.log({ columnTotals });
console.log("----");
console.log(answer);
console.log("----");

logAnswerCheck(answer, 4277556);
