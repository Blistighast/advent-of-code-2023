const { readFileSync } = require("fs");

const example = readFileSync("example.txt", { encoding: "utf-8" })
  .replace(/\r/g, "") //remove all \r characters (carriage return) just in case
  .trim() // remove white space at beginning and end
  .split("\n"); //split text into array of each line

const input = readFileSync("input.txt", { encoding: "utf-8" })
  .replace(/\r/g, "") //remove all \r characters (carriage return) just in case
  .trim() // remove white space at beginning and end
  .split("\n"); //split text into array of each line

function day3part1(schematic) {
  return schematic;
}

console.log(day3part1(example));
