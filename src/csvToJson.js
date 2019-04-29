function convertCsvToJson(fileName) {
  const csvToJson = require('convert-csv-to-json');
  let obj = csvToJson.fieldDelimiter(',').getJsonFromCsv(fileName);
  return obj;
}

module.exports = convertCsvToJson;