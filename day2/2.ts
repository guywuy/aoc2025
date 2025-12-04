import { sumInts } from "../utils.ts";

const text = await Deno.readTextFile("input-test.txt");
const data = text
  .trim()
  .split(",")
  .map((l) => l.split("-").map((i) => parseInt(i)));

const invalids = data.reduce((collection, range) => {
  const sillies = [];
  for (let i = range[0]; i <= range[1]; i++) {
    console.log('----');
    console.log('---- checking number', i);
    const iStr = i.toString();
    const length = iStr.length;
    for (
      let substringIndex = 1;
      substringIndex <= Math.floor(iStr.length / 2);
      substringIndex++
    ) {
      const substring = iStr.substring(0, substringIndex);
      console.log('---- checking substring', substring);

      if (length % substringIndex === 0) {
        let matches = true;
        for (
          let chunk = substringIndex;
          chunk <= length;
          chunk += substringIndex
        ) {
          const substringToCheck = iStr.substring(
            chunk,
            chunk + substringIndex
          );
          if (substring !== substringToCheck) {
            matches = false;
            console.log("not a match", substring, substringToCheck);
            continue;
          }
        }
        if (matches) {
          sillies.push(i);
          console.log("match!", i, substringIndex);
          break;
        }
      }
    }
  }
  return [...collection, ...sillies];
}, []);

const answer = sumInts(invalids);
console.log(invalids);
console.log("----");
console.log(answer);
console.log("----");
