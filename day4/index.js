const { readFileSync } = require("fs");

const example = readFileSync("example.txt", { encoding: "utf-8" })
  .replace(/\r/g, "") //remove all \r characters (carriage return) just in case
  .trim() // remove white space at beginning and end
  .split("\n"); //split text into array of each line

const input = readFileSync("input.txt", { encoding: "utf-8" })
  .replace(/\r/g, "") //remove all \r characters (carriage return) just in case
  .trim() // remove white space at beginning and end
  .split("\n"); //split text into array of each line

function day4part1(cards) {
  const cardPoints = [];

  //check cards
  for (const card of cards) {
    let winningPoints = 0;

    //grab winning numbers
    const winningNumbers = card
      .slice(/\:/.exec(card).index + 1, /\|/.exec(card).index)
      .trim()
      .split(" ");

    //grab player numbers
    const playedNumbers = card
      .slice(/\|/.exec(card).index + 1)
      .trim()
      .split(/\s+/g);

    //check which player numbers are winners and get points
    for (let num of playedNumbers) {
      if (winningNumbers.includes(num)) {
        winningPoints === 0 ? (winningPoints = 1) : (winningPoints *= 2);
      }
    }

    //save points
    cardPoints.push(winningPoints);

    // console.log(
    //   "winning numbers:",
    //   winningNumbers,
    //   "played numbers",
    //   playedNumbers,
    //   "points",
    //   winningPoints
    // );
  }

  //add up total points
  return cardPoints.reduce((a, b) => a + b);
}

console.log(day4part1(example));
console.log(day4part1(input));

function day4part2(cards) {}
