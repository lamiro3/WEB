require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const ADMIN = {
    username: "admin",
    passwordHash: process.env.passwordHash
};

router.post("/login", async (request, response) => {
    let date = new Date();
    console.log(date);
    console.log("BODY =", request.body);
    console.log("USERNAME =", request.body?.username);
    console.log("PASSWORD =", request.body?.password);
    const { username, password } = request.body;

    if (username != ADMIN.username) {
        return response.sendStatus(401);
    }

    const isFine = await bcrypt.compare(password, ADMIN.passwordHash);

    if (!isFine){
        return response.sendStatus(401);
    }

    const accessToken = jwt.sign(
        {role: "ADMIN"},
        process.env.JWT_SECRET,
        {expiresIn: "30m"}
    );

    const refreshToken = jwt.sign(
        {role: "ADMIN"},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    );

    response.json({ accessToken, refreshToken});
});

// router라는 모듈로 export 하겠다는 거
module.exports = router;