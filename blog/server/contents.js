/*
새로 작성한 content contents.json에 갱신 (추후에 수정, 삭제도 반영 예정)
*/

const getDate = require("./getDate");
const express = require("express");
const path = require("path");
const fs = require("fs");

const CONTENTS_PATH = path.join(__dirname, "../public/data/contents.json");

const router = express.Router();

// 반드시 post 주소는 개별로! ( 그래야 submit event 서로 안겹침 )
router.post("/contents", async (req, res) => {
    let {year, month, day} = getDate();
    console.log(`New Content emerge [${year}-${month}-${day}]: ${req.body?.title}`);

    const {content_id, 
        title, 
        post, 
        summary, 
        createdAt, 
        tags} = req.body;

        try {
            const prev = fs.readFileSync(CONTENTS_PATH, "utf-8");
            const contents = JSON.parse(prev);

            const newContent = {
                content_id, title, post, summary, createdAt, tags
            }

            contents.push(newContent)
            fs.writeFileSync(CONTENTS_PATH, JSON.stringify(contents, null, 2), "utf-8");

            res.status(200).json(newContent);
        } catch(error) {
            console.error("새 콘텐츠 추가 에러 발생: ", error);
            res.status(500).json({message: "서버 에러 발생!!!!"})
        }
});

module.exports = router;