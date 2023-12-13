const { readFileSync } = require("node:fs");

const example1 = readFileSync("example1.txt", { encoding: "utf-8" }) //read text content
  .replace(/\r/g, "") //remove all \r characters (carriage return) just in case
  .trim() // remove white space at beginning and end
  .split("\n"); //split text into array of each line

const example2 = readFileSync("example2.txt", { encoding: "utf-8" }) //read text content
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

// console.log(day1Part1(example));
// console.log(day1Part1(input));

function day1Part2(list) {
  const combinedNumbers = [];
  const regex = /(one|two|three|four|five|six|seven|eight|nine)/g;

  const numbersMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  for (let line of list) {
    const numbered = line.split(regex);
    for (let i = 0; i < numbered.length; i++) {
      if (numbered[i] === "one") {
        numbered[i] = "1";
      } else if (numbered[i] === "three") {
        numbered[i] = "3";
      } else if (numbered[i] === "two") {
        numbered[i] = "2";
      } else if (numbered[i] === "four") {
        numbered[i] = "4";
      } else if (numbered[i] === "five") {
        numbered[i] = "5";
      } else if (numbered[i] === "six") {
        numbered[i] = "6";
      } else if (numbered[i] === "seven") {
        numbered[i] = "7";
      } else if (numbered[i] === "eight") {
        numbered[i] = "8";
      } else if (numbered[i] === "nine") {
        numbered[i] = "9";
      }
    }
    const joined = numbered.join("");

    // const numbered = line.replace(regex, "$1 $2");
    // console.log(numbered);
    // const cleanedLine = numbered.replace(/\D/g, "");
    const cleanedLine = joined.replace(/\D/g, "");
    const lineNum = parseInt(
      Array(cleanedLine[0], cleanedLine.slice(-1)).join("")
    );
    combinedNumbers.push(lineNum);
    console.log(joined);
  }

  return combinedNumbers.reduce((a, b) => a + b, 0);
}

// console.log(day1Part2(example2));
console.log(day1Part2(input));
