const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "https://kanbanx.vercel.app",

    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", require("./src/v1/routes"));

connectDB();
app.get("/", (req, res) => {
  res.send("Welcome to Kanban - X");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT} `);
});
