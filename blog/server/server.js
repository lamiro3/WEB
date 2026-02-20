// .env 불러오기
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRouter = require("./auth");
const tagRouter = require("./tag");
const contentsRouter = require("./contents");

const app = express();

//1. CORS set (FRONTEND 주소로 부터의 접근 허용)
app.use(cors({
    origin: 'http://localhost:3000', // React 실행 주소
    credentials: true
}));
app.use(express.json());

app.use("/", authRouter);
app.use("/", tagRouter);
app.use("/", contentsRouter);

// 2. 브라우저에서 /img/파일명 으로 접근 시 서버의 public/img 폴더를 보여줌
app.use("/img", express.static(path.join(__dirname, 'public/img')));

app.listen(8080, () => {
    console.log("Server is Running!");
})