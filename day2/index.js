const { readFileSync } = require("fs");

const example = readFileSync("example.txt", { encoding: "utf-8" })
  .replace(/\r/g, "") //remove all \r characters (carriage return) just in case
  .trim() // remove white space at beginning and end
  .split("\n"); //split text into array of each line

const input = readFileSync("input.txt", { encoding: "utf-8" })
  .replace(/\r/g, "") //remove all \r characters (carriage return) just in case
  .trim() // remove white space at beginning and end
  .split("\n"); //split text into array of each line

//which games are possible with 12 red, 14 blue, 13 green
function day2part1(games) {
  const gameList = {};
  const possibleGames = [];

  //format games list into object
  for (let game of games) {
    const gameFormatter = game.split(":");
    gameList[gameFormatter[0].replace(/Game\s/, "")] = gameFormatter[1]
      .trim()
      .split("; ");
  }

  //go through game rounds and get highest total of each color
  for (let game in gameList) {
    const gameCubeTotals = { red: 0, blue: 0, green: 0 };
    for (let round of gameList[game]) {
      const currentRed = parseInt(/(\d*)\sred/.exec(round)?.at(1));
      const currentBlue = parseInt(/(\d*)\sblue/.exec(round)?.at(1));
      const currentGreen = parseInt(/(\d*)\sgreen/.exec(round)?.at(1));
      if (currentRed > gameCubeTotals.red) gameCubeTotals.red = currentRed;
      if (currentBlue > gameCubeTotals.blue) gameCubeTotals.blue = currentBlue;
      if (currentGreen > gameCubeTotals.green)
        gameCubeTotals.green = currentGreen;
    }
    gameList[game] = gameCubeTotals;
  }

  //check which games are possible
  for (let game in gameList) {
    if (
      gameList[game].red <= 12 &&
      gameList[game].blue <= 14 &&
      gameList[game].green <= 13
    ) {
      possibleGames.push(parseInt(game));
    }
  }

  //add up possible games
  return possibleGames.reduce((a, b) => a + b);
}

console.log(day2part1(example));
console.log(day2part1(input));
