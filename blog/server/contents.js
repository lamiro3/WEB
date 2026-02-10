/*
새로 작성한 content contents.json에 갱신 (추후에 수정, 삭제도 반영 예정)
*/

const getDate = require("./getDate");
const multer = require("multer");
const express = require("express");
const path = require("path");
const fs = require("fs");

const CONTENTS_PATH = path.join(__dirname, "../public/data/contents.json");
const UPLOADE_IMG_PATH = "public/img/"; // 업로드한 사진이 저장되는 경로

const storage = multer.diskStorage({
    destination: (req, file, cb) => { // 사진 파일 저장 경로
        cb(null, UPLOADE_IMG_PATH)
    },

    filename: (req, file, cb) => {
        // 원본 파일 확장자 유지 & 고유명 생성
        const uniqueName = Date.now() + "-" + Math.round(Math.random()*1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueName + ext);
    }
});

const router = express.Router();
const upload = multer({storage: storage});

// 반드시 post 주소는 개별로! ( 그래야 submit event 서로 안겹침 )
router.post("/contents", upload.array("images"), async (req, res) => {
    let {year, month, day} = getDate();
    const imagePaths = req.files.map(file => `/img/${file.filename}`)

    console.log(`New Content emerge [${year}-${month}-${day}]: ${req.body?.title}`);

    const {id, 
        title, 
        post, 
        summary, 
        createdAt, 
        tags} = req.body;

        try {
            const prev = fs.readFileSync(CONTENTS_PATH, "utf-8");
            const contents = JSON.parse(prev);

            const newContent = {
                id: Number(id),
                title, 
                post, 
                summary, 
                createdAt, 
                tags: typeof tags === 'string' ? JSON.parse(tags) : tags,
                images: imagePaths // 사진이 아닌 사진 경로를 저장!
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