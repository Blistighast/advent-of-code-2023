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
  const partNumbers = [];

  for (const [i, line] of schematic.entries()) {
    const lineNumbers = [];
    //grab numbers
    const numberRegex = RegExp("\\d+", "g"); // RegExp("\\d+", "g") is same as /\d+/g
    while ((numberLine = numberRegex.exec(line)) !== null) {
      //need while loop to grab every match not just first one in line
      lineNumbers.push(numberLine);
    }

    // console.log(line, i);
    //check if symbol is by number
    for (let number of lineNumbers) {
      const symbolRegex = /[^a-zA-Z0-9\.]/g;

      // console.log(number, i);
      console.log(schematic[i - 1]?.match(symbolRegex));
      if (
        line[number.index - 1]?.match(symbolRegex) || //check before number
        line[number.index + number[0].length]?.match(symbolRegex)
        // || //check after number
        // lineNumbers[number - 1]?.match(symbolRegex) //check above number
      ) {
        partNumbers.push(number[0]);
      }
    }
  }

  //sum up part numbers and return
  return partNumbers;
}

console.log(day3part1(example));
