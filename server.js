const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const app = express();
dotenv.config();

connectDB();
app.get("/", (req, res) => {
  res.send("Welcome to Kanban - X");
});

app.listen(process.env.PORT, () => {
  console.log("Listening on port 3000");
});
