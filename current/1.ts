import { logAnswerCheck } from "../utils.ts";

const text = await Deno.readTextFile("current/input.txt");
const data = text
  .trim()
  .split("\n")
  .map((l) => l.split(""));

// For each line, each char,
// if above is marked ('S') and this char is ., mark
// if above is marked and this char is ^, add to splitTotal and mark left and right
// if above is nor marked, ignore

let answer = 0;
const processed = [] as string[][];

data.forEach((line, index) => {
  if (index === 0) {
    processed.push(line);
    return;
  }

  const newLine = [...line];
  // processed.push([]);
  const lineAbove = processed.at(index - 1);
  console.log(lineAbove);
  line.forEach((char, charIndex) => {
    const charAbove = lineAbove![charIndex];

    if (charAbove === "S" && char === ".") {
      newLine[charIndex] = "S";
    } else if (charAbove === "S" && char === "^") {
      answer ++;
      newLine[charIndex] = ".";
      if (charIndex > 0) {
        newLine[charIndex - 1] = "S";
      }
      if (charIndex < newLine.length - 1) {
        newLine[charIndex + 1] = "S";
      }
    }
  });
  processed.push(newLine);
});

console.log(data.map(l => l.join('')));
console.log(processed.map(l => l.join('')));

console.log("----");
console.log(answer);
console.log("----");

logAnswerCheck(answer, 21);
