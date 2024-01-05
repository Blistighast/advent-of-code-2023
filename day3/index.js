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

  //go through schematic
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

// console.log(day3part1(example));
// console.log(day3part1(input));

function day3part2(schematic) {
  const gearRatios = [];
  const gearCheckHash = {}; //how many numbers does * touch

  //go through schematic
  for (const [i, line] of schematic.entries()) {
    const symbolsIndexLine = [];
    const prevLineNumbers = [];
    const nextLineNumbers = [];
    const symbolRegex = /\*/g;
    const numberRegex = /\d+/g;

    //grab "*" symbols
    while ((symbolLine = symbolRegex.exec(line)) !== null) {
      symbolsIndexLine.push(symbolLine.index);
    }

    //grab numbers
    while ((numberLine = numberRegex.exec(schematic[i - 1])) !== null) {
      prevLineNumbers.push(numberLine);
    }
    while ((numberLine = numberRegex.exec(schematic[i + 1])) !== null) {
      nextLineNumbers.push(numberLine);
    }

    // console.log(symbolsIndexLine);
    console.log(prevLineNumbers);

    for (let symbol of symbolsIndexLine) {
      //check if number around symbol, add to hash
      //before
      if (line[symbol - 1]?.match(numberRegex)) {
        gearCheckHash[`${i}, ${symbol}`]
          ? (gearCheckHash[`${i}, ${symbol}`] = {
              count: (gearCheckHash[`${i}, ${symbol}`].count += 1),
              ratio:
                gearCheckHash[`${i}, ${symbol}`].ratio *
                line.slice(symbol - 3, symbol).match(numberRegex),
            })
          : (gearCheckHash[`${i}, ${symbol}`] = {
              count: 1,
              ratio: parseInt(
                line.slice(symbol - 3, symbol).match(numberRegex)[0] //if errors check this first, can grab the wrong number if they are too close
              ),
            });
      }
      //after
      if (line[symbol + 1]?.match(numberRegex)) {
        gearCheckHash[`${i}, ${symbol}`]
          ? (gearCheckHash[`${i}, ${symbol}`] = {
              count: (gearCheckHash[`${i}, ${symbol}`].count += 1),
              ratio:
                gearCheckHash[`${i}, ${symbol}`].ratio *
                line.slice(symbol + 1).match(numberRegex),
            })
          : (gearCheckHash[`${i}, ${symbol}`] = {
              count: 1,
              ratio: line.slice(symbol + 1).match(numberRegex),
            });
      }
      //line before
      //can have 2 numbers that touch on same past line
      //if no index of prev line numbers are = to index of symbol, need to check if 2 numbers touch, if 1 number is directly over it, it can only be that one number
    }
  }
  // console.log(gearCheckHash);

  //sum up gearRatios and return
  return gearCheckHash;
}

console.log(day3part2(example));
