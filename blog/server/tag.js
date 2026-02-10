const getDate = require("./getDate");
const express = require("express");
const path = require("path");
const fs = require("fs");

const TAG_PATH = path.join(__dirname, "../public/data/tags.json");

const router = express.Router();

router.post("/tags", async (req, res) => {
    let {year, month, day} = getDate();
    console.log(`New tag emerge [${year}-${month}-${day}]: ${req.body?.name}`);

    const {id, name} = req.body;

    try {
        const prev = fs.readFileSync(TAG_PATH, "utf-8");
        const tags = JSON.parse(prev); // string -> JSON obj

        const newTag = {id, name};
        tags.push(newTag);

        fs.writeFileSync(TAG_PATH, JSON.stringify(tags, null, 2), "utf-8");

        res.status(200).json(newTag);
    } catch (error) {
        console.error("새 태그 추가 에러 발생: ", error);
        res.status(500).json({message: "서버 에러 발생!!!!"});
    }
});

module.exports = router;