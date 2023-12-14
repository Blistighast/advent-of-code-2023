const { readFileSync } = require("fs");

const example = readFileSync("example.txt", { encoding: "utf-8" })
  .replace(/\r/g, "") //remove all \r characters (carriage return) just in case
  .trim() // remove white space at beginning and end
  .split("\n"); //split text into array of each line

function day2part1(games) {
  const gameList = {};
  // const regexID = /Game\s/;

  //format games list into object
  for (let game of games) {
    const gameFormatter = game.split(":");
    gameList[gameFormatter[0].replace(/Game\s/, "")] = gameFormatter[1]
      .trim()
      .split("; ");
  }

  return gameList;
}

console.log(day2part1(example));
