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
      // console.log("dbName - ", UserInfo.db.name);
      // const collectionList = await mongoose.connection.db
      //   .listCollections()
      //   .toArray(function (err, names) {
      //     console.log(names); // [{ name: 'dbname.myCollect
      //   });
      // console.log("collections", collectionList);

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

router.get("/getData/:collectionName", async (req, res) => {
  console.log(JSON.stringify(req.params.collectionName));
  const UserNewInfo = await mongoose.model(
    req.params.collectionName,
    databaseConnection.UserInfoSchema
  );
  const all = await UserNewInfo.find({});
  console.log("All", JSON.stringify(all));
  res.json(all);
});
module.exports = router;
