const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const express = require("express");
const router = express.Router();
const CSVToJSON = require("csvtojson");

// const csvToJsonConverter = require("../controllers/csvToJson.js");
let fs = require("fs");
const multer = require("multer");

const connectionUri = ``;
mongoose
  .connect(connectionUri, { useNewUrlParser: true })
  .then(() => {
    console.log("Connection to database established");
  })
  .catch((err) => {
    console.log(err);
    process.exit(-1);
  });

const UserInfoSchema = new mongoose.Schema(
  //   name: { type: String },
  //   branch: { type: String },
  {
    feeds: [Schema.Types.Mixed],
  },
  { strict: false }
);

module.exports = { UserInfoSchema };
