export const sum = (a: number, b: number) => a + b;

export const mapToInts = (strs: string[]) => strs.map((s) => parseInt(s));

export const sumInts = (arr: number[]) => arr.reduce(sum, 0);

export const numbersToString = (arr: number[]) =>
  arr.map((i) => i.toString()).join("");

export const splitStringByWhitespace = (l: string) => l.split(/\s+/g);

// deno-lint-ignore no-explicit-any
export const logAnswerCheck = (answer: any, expected: any) => {
  if (answer === expected) {
    console.log("SUCCESS :)");
  } else {
    console.warn("FAIL, should have matched");
    console.warn(expected);
  }
};
