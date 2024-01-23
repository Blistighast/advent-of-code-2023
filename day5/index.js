const { readFileSync } = require("fs");

const example = readFileSync("example.txt", { encoding: "utf-8" })
  .replace(/\r/g, "") //remove all \r characters (carriage return) just in case
  .trim(); // remove white space at beginning and end
// .split("\n"); //split text into array of each line

const input = readFileSync("input.txt", { encoding: "utf-8" })
  .replace(/\r/g, "") //remove all \r characters (carriage return) just in case
  .trim(); // remove white space at beginning and end
// .split("\n"); //split text into array of each line

function day5part1(almanac) {
  const formattedAlmanac = inputFormatter(almanac);

  console.log(formattedAlmanac);
  // return almanac;
}

console.log(day5part1(example));
// console.log(day5part1(input));

function inputFormatter(input) {
  const almanacMap = {};

  almanacMap.seeds = /(?<=seeds:\s*)((\d+\s*)+)\n\n/.exec(input)[1].split(" ");
  almanacMap.soil =
    /(?<=seed-to-soil map:\n)[\S\s]*(?=\n\nsoil-to-fertilizer map:)/g
      .exec(input)[0]
      .split("\n")
      .map((line) => line.split(" "));
  almanacMap.fertilizer =
    /(?<=soil-to-fertilizer map:\n)[\S\s]*(?=\n\nfertilizer-to-water map:)/g
      .exec(input)[0]
      .split("\n")
      .map((line) => line.split(" "));
  almanacMap.water =
    /(?<=fertilizer-to-water map:\n)[\S\s]*(?=\n\nwater-to-light map:)/g
      .exec(input)[0]
      .split("\n")
      .map((line) => line.split(" "));
  almanacMap.light =
    /(?<=water-to-light map:\n)[\S\s]*(?=\n\nlight-to-temperature map:)/g
      .exec(input)[0]
      .split("\n")
      .map((line) => line.split(" "));
  almanacMap.temperature =
    /(?<=light-to-temperature map:\n)[\S\s]*(?=\n\ntemperature-to-humidity map:)/g
      .exec(input)[0]
      .split("\n")
      .map((line) => line.split(" "));
  almanacMap.humidity =
    /(?<=temperature-to-humidity map:\n)[\S\s]*(?=\n\nhumidity-to-location map:)/g
      .exec(input)[0]
      .split("\n")
      .map((line) => line.split(" "));
  almanacMap.location = /(?<=humidity-to-location map:\n)[\S\s]*/g
    .exec(input)[0]
    .split("\n")
    .map((line) => line.split(" "));

  return almanacMap;
}
