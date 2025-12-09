import { logAnswerCheck, sumInts } from "../utils.ts";

const text = await Deno.readTextFile("current/input.txt");
const data = text.trim().split("\n");

// We need to split into columns
// get all indices in line which have ' ' for every item

const indicesToSplitAt = [] as number[];

for (let i = 0; i < data[0].length; i++) {
  let empty = true;
  for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
    if (data.at(rowIndex)?.at(i) !== " ") {
      empty = false;
      break;
    }
  }
  if (empty) {
    indicesToSplitAt.push(i);
  }
}
type Row = string[];

const rows = data.map((line) => {
  const row: Row = [];
  row.push(line.slice(0, indicesToSplitAt[0]));
  indicesToSplitAt.forEach((splitIndex, index) => {
    row.push(
      index === indicesToSplitAt.length - 1
        ? line.slice(splitIndex + 1)
        : line.slice(splitIndex + 1, indicesToSplitAt.at(index + 1))
    );
  });
  return row;
});

interface Column {
  values: string[];
  operator?: "*" | "+";
}

const columns = [] as Column[];

for (let rowI = 0; rowI < rows.length; rowI++) {
  const row = rows[rowI];
  row.forEach((item, colIndex) => {
    const isLast = rowI === rows.length - 1;
    const newValues = columns[colIndex] ? [...columns[colIndex].values] : [];
    if (!isLast) {
      newValues.push(item);
    }
    columns[colIndex] = {
      values: newValues,
      operator: isLast ? (item.includes("*") ? "*" : "+") : undefined,
    };
  });
}

const calculations = columns.reduce((calx, column) => {
  const numLength = column.values[0].length;
  const transformedVals = [] as string[];
  column.values.forEach((value) => {
    for (let i = numLength; i >= 0; i--) {
      console.log(value[i]);
      transformedVals[i] = transformedVals[i]
        ? `${transformedVals[i]}${value[i]}`
        : value[i];
    }
  });
  const valsToCalculate = transformedVals
    .filter((i) => !!i)
    .map((i) => parseInt(i, 10));
  // console.log("-----");
  // console.log("col vals", column.values);
  // console.log({ transformedVals });
  // console.log("-----");
  let total = column.operator === "+" ? 0 : 1;
  valsToCalculate.forEach((val) => {
    if (column.operator === "*") {
      total *= val;
    } else {
      total += val;
    }
  });

  return [...calx, total];
}, [] as number[]);

const answer = sumInts(calculations);
console.log(data);
console.log(indicesToSplitAt);
console.log({ rows });
console.log({ columns });
console.log("---- ANSWER");
console.log(answer);
console.log("---- /ANSWER");

logAnswerCheck(answer, 3263827);
