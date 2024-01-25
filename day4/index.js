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
  }

  //add up total points
  return cardPoints.reduce((a, b) => a + b);
}

// console.log(day4part1(example));
// console.log(day4part1(input));

function day4part2(cards) {
  let totalCards = 0;
  const allCards = {};

  for (const card of cards) {
    let amountWon = 0;
    //grab card name
    const cardName = card?.match(/Card\s+(\d+)\:/)[1];

    //grab winning numbers
    const winningNumbers = card
      .slice(/\:/.exec(card).index + 1, /\|/.exec(card).index)
      .trim()
      .split(/\s+/g);

    //grab player numbers
    const playedNumbers = card
      .slice(/\|/.exec(card).index + 1)
      .trim()
      .split(/\s+/g);

    //check which player numbers are winners
    for (let num of playedNumbers) {
      if (winningNumbers.includes(num)) {
        amountWon += 1;
      }
    }

    //create card info with amounts
    allCards[cardName]
      ? (allCards[cardName] = {
          totalWins: amountWon,
          cardAmount: (allCards[cardName].cardAmount += 1),
        })
      : (allCards[cardName] = { totalWins: amountWon, cardAmount: 1 });

    //add winning cards to their respective card
    if (amountWon) {
      for (let i = 1; i <= amountWon; i++) {
        allCards[parseInt(cardName) + i]
          ? (allCards[parseInt(cardName) + i] = {
              cardAmount: (allCards[parseInt(cardName) + i].cardAmount +=
                allCards[cardName].cardAmount),
            })
          : (allCards[parseInt(cardName) + i] = { cardAmount: 1 });
      }
    }
  }

  for (let card in allCards) {
    totalCards = totalCards += allCards[card].cardAmount;
  }

  // console.log(allCards);
  return totalCards;
}

console.log(day4part2(example));
console.log(day4part2(input));
