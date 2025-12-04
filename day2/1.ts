import { sumInts } from "../utils.ts";

const text = await Deno.readTextFile("input.txt");
const data = text
  .trim()
  .split(",")
  .map((l) => l.split("-").map((i) => parseInt(i)));

const invalids = data.reduce((collection, range) => {
  const sillies = [];
  for (let i = range[0]; i <= range[1]; i++) {
    const iStr = i.toString();
    const length = iStr.length;
    if (length % 2 === 0) {
      const [one, two] = [
        iStr.substring(0, iStr.length / 2),
        iStr.substring(iStr.length / 2),
      ];
      // if first half as a string matches second, add it
      if (one === two) {
        sillies.push(i);
      }
    }
  }
  return [...collection, ...sillies];
}, []);

const answer = sumInts(invalids);
console.log(data);
console.log(invalids);
console.log("----");
console.log(answer);
console.log("----");
