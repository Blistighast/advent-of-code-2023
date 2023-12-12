const { readFileSync } = require("node:fs");

const example = readFileSync("example.txt", { encoding: "utf-8" }) //read text content
  .replace(/\r/g, "") //remove all \r characters (carriage return) just in case
  .trim() // remove white space at beginning and end
  .split("\n"); //split text into array of each line

const input = readFileSync("input.txt", { encoding: "utf-8" }) //read text content
  .replace(/\r/g, "") //remove all \r characters (carriage return) just in case
  .trim() // remove white space at beginning and end
  .split("\n"); //split text into array of each line

function day1Part1(list) {
  const combinedNumbers = [];

  for (let line of list) {
    const cleanedLine = line.replace(/\D/g, "");
    const lineNum = parseInt(
      Array(cleanedLine[0], cleanedLine.slice(-1)).join("")
    );
    combinedNumbers.push(lineNum);
  }

  return combinedNumbers.reduce((a, b) => a + b, 0);
}

console.log(day1Part1(example));
console.log(day1Part1(input));
