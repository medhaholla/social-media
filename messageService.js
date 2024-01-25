const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
  console.log("recieved the webhook");

  res.send("webhook recieved successfully");
});

app.listen(5051, () => {
  console.log("Listening");
});

module.exports = app;
