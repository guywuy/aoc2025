import { logAnswerCheck } from "../utils.ts";

// The Elves start bringing their spoiled inventory to the trash chute at the back of the kitchen.

// So that they can stop bugging you when they get new inventory, the Elves would like to know all of the IDs that the fresh ingredient ID ranges consider to be fresh. An ingredient ID is still considered fresh if it is in any range.

// Now, the second section of the database (the available ingredient IDs) is irrelevant. Here are the fresh ingredient ID ranges from the above example:

// 3-5
// 10-14
// 16-20
// 12-18

// The ingredient IDs that these ranges consider to be fresh are 3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, and 20. So, in this example, the fresh ingredient ID ranges consider a total of 14 ingredient IDs to be fresh.

// Process the database file again. How many ingredient IDs are considered to be fresh according to the fresh ingredient ID ranges?

const text = await Deno.readTextFile("current/input.txt");
const data = text
  .trim()
  .split("\n\n")
  .map((l) => l.split("\n"));

interface Range {
  start: number;
  end: number;
}

const ranges = data[0].map((line) => {
  const [start, end] = line.split("-").map((n) => parseInt(n, 10));
  return { start, end };
});

ranges.sort((a, b) => a.start - b.start);

const mergedRanges: Range[] = [];

if (ranges.length > 0) {
  // Start with the first range
  mergedRanges.push({ ...ranges[0] });

  for (let i = 1; i < ranges.length; i++) {
    const current = ranges[i];
    const lastMerged = mergedRanges[mergedRanges.length - 1];

    // 3. Check for overlap or adjacency
    // Since we sorted by start, we only need to check if current starts
    // before (or immediately after) the last one ends.
    if (current.start <= lastMerged.end + 1) {
      // Overlap or touching: Extend the previous range
      lastMerged.end = Math.max(lastMerged.end, current.end);
    } else {
      // No overlap: Push as a new range
      mergedRanges.push({ ...current });
    }
  }
}

// let finished = false;
// while (!finished) {
//   let mergesMade = 0;

//   ranges = ranges.reduce((merged, range) => {
//     const found = merged.find((entry) => {
//       return range.start >= entry.start && range.start <= entry.end + 1;
//     });

//     if (found) {
//       console.log({ found });
//       mergesMade++;
//       found.end = Math.max(found.end, range.end);
//       return merged;
//     } else {
//       return [...merged, range];
//     }
//   }, [] as Range[]);

//   if (mergesMade == 0) {
//     finished = true;
//   }
// }

const answer = mergedRanges.reduce(
  (sum, range) => sum + (range.end - range.start) + 1,
  0
);

console.log(ranges);
// console.log(mergedRanges);
console.log("----");
console.log(answer);
console.log("----");

logAnswerCheck(answer, 14);
