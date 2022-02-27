const getJSON = require("./getJSON.js");

module.exports = async function getTemperature(city) {
  let c = await getJSON(
    `https://globaltemps.example.com/api/city/${city.toLowerCase()}`
  );
  return (c * 5 / 9) + 32; // TODO: この式を確認
}
