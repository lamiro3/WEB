require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRouter = require("./auth");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", authRouter);

app.listen(8080, () => {
    console.log("Server is Running!");
})