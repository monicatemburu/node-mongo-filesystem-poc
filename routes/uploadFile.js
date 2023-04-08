const express = require("express");
const router = express.Router();
const CSVToJSON = require("csvtojson");
const mongoose = require("mongoose");
// const csvToJsonConverter = require("../controllers/csvToJson.js");
const databaseConnection = require("../storageModels/databaseConnection.js");
let fs = require("fs");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../resources");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/uploadFile", upload.single("uploaded_file"), (req, res) => {
  console.log(req.file);
  console.log(req.file.filename);
  const modelName = req.file.filename;

  CSVToJSON()
    .fromFile(req.file.path)
    .then(async (users) => {
      // users is a JSON array
      // log the JSON array
      console.log(users);
      const UserInfo = await mongoose.model(
        modelName,
        databaseConnection.UserInfoSchema
      );
      var file = new UserInfo({
        users,
      });

      // save model to database
      file.save();
    })
    .catch((err) => {
      // log error if any
      console.log(err);
    });
});

module.exports = router;
