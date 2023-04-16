const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const express = require("express");
const router = express.Router();
const CSVToJSON = require("csvtojson");

// const csvToJsonConverter = require("../controllers/csvToJson.js");
let fs = require("fs");
const multer = require("multer");

const connectionUri = `mongodb+srv://m001-student:m001-student@sandbox.8u7o5ct.mongodb.net/test?retryWrites=true&w=majority`;
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

// console.log(model.db.name);
module.exports = { UserInfoSchema };
