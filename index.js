const express = require("express");
const limitter = require("express-rate-limit");
const app = express();
const mongoose = require("mongoose");
const route = require("./src/router");
const multer = require("multer");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const cors = require('cors')
require("dotenv").config();
app.use(cors({
  origin: process.env.CORSURL
}))
app.use(
  limitter({
    windowMs: 15000, // 15 sec,
    max: 7,
    message: `too many request try again after some time`,
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log(`mongodb is connected`))
  .catch((e) => console.log(e.message));

app.use("/", route);

app.listen(process.env.PORT || 3000, () =>
  console.log(`server is running on port number ${}`)
);

app.use(errorMiddleware);
