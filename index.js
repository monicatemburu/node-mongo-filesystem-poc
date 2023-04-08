const express = require("express");
const app = express();
const uploadRouter = require("./routes/uploadFile.js");
app.use(express.json());
app.use(uploadRouter);
app.listen("3000", (err) => {
  if (err) {
    console.log("Error saying - ", err);
  }
  console.log("Server is up and running");
});
