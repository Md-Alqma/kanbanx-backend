const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", authRoutes);

connectDB();
app.get("/", (req, res) => {
  res.send("Welcome to Kanban - X");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT} `);
});
