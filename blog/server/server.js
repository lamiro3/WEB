// .env 불러오기
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRouter = require("./auth");
const tagRouter = require("./tag");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", authRouter);
app.use("/", tagRouter);

app.listen(8080, () => {
    console.log("Server is Running!");
})