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
    const prevLineSymbols = [];
    const nextLineSymbols = [];
    //symbol not including period
    // const symbolRegex = /[^a-zA-Z0-9\.]/g;
    const symbolRegex = RegExp("[^a-zA-Z0-9.]", "g");
    const numberRegex = RegExp("\\d+", "g"); // RegExp("\\d+", "g") is same as /\d+/g

    //grab numbers
    //need while loop to grab every match not just first one in line
    while ((numberLine = numberRegex.exec(line)) !== null) {
      // console.log(numberLine);
      lineNumbers.push(numberLine);
    }

    //grab symbols
    while ((symbolLine = symbolRegex.exec(schematic[i - 1])) !== null) {
      prevLineSymbols.push(symbolLine.index);
    }
    while ((symbolLine = symbolRegex.exec(schematic[i + 1])) !== null) {
      nextLineSymbols.push(symbolLine.index);
    }

    // console.log(
    //   prevLineSymbols,
    //   lineNumbers,
    //   nextLineSymbols
    //   // prevLineSymbols.forEach((symbol) => console.log(symbol.index))
    // );
    // console.log(nextLineSymbols);

    // console.log(line, i);
    //check if symbol is by number
    for (let number of lineNumbers) {
      // console.log(number, i);
      // console.log(nextLineSymbols);
      if (
        line[number.index - 1]?.match(symbolRegex) || //check before number
        line[number.index + number[0].length]?.match(symbolRegex)
      ) {
        partNumbers.push(number[0]);
      }
      //check above number
      for (let symbolIndex of prevLineSymbols) {
        if (
          // !partNumbers.includes(number[0]) &&
          symbolIndex >= number.index - 1 &&
          symbolIndex <= number.index + number[0].length
        ) {
          partNumbers.push(number[0]);
        }
      }
      //check below number
      for (let symbolIndex of nextLineSymbols) {
        if (
          // !partNumbers.includes(number[0]) &&
          symbolIndex >= number.index - 1 &&
          symbolIndex <= number.index + number[0].length
        ) {
          partNumbers.push(number[0]);
        }
      }
    }
  }

  //sum up part numbers and return
  return partNumbers.reduce((a, b) => parseInt(a) + parseInt(b));
}

console.log(day3part1(example));
console.log(day3part1(input));
