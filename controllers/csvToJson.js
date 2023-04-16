// require csvtojson module
const CSVToJSON = require("csvtojson");
var path = require("path");
var filename = path.basename("../resources/data.csv", ".csv");
console.log(filename);

// convert users.csv file to JSON array
CSVToJSON()
  .fromFile("../resources/data.csv")
  .then((users) => {
    // users is a JSON array
    // log the JSON array
    console.log(users);
  })
  .catch((err) => {
    // log error if any
    console.log(err);
  });
