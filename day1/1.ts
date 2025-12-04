const text = await Deno.readTextFile("input.txt");
const data = text
  .trim()
  .split("\n")
  .map((l) => [l.at(0)!, l.substring(1)!]);

const positions = data.reduce(
  (acc, line) => {
    const int = parseInt(line[1], 10) % 100;

    const value =
      (line[0] === "L" ? acc.at(-1)! - int : acc.at(-1)! + int) % 100;

    const rolledOver = value < 0 ? 100 + value : value;

    return [...acc, rolledOver];
  },
  [50] as number[]
);

console.log(positions);
const answer = positions.reduce((prev, item) => {
  return item === 0 ? prev + 1 : prev;
}, 0);

console.log(answer);
