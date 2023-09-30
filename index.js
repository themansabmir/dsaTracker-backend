const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("connected", () => {
  console.log("connected to database");
}).on("error", (err) => {
  console.log(err);
});
app.use(cors());

app.get("/", (req, res) => {
  res.send("home page path");
});

app.use("/api/auth", require("./auth"), require("./Routes/dsaRoutes"));
app.use("/api", require("./Routes/userRoutes"));

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
