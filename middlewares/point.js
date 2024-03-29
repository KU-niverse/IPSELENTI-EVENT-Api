//무슨 이유로 포인트를 얼마나 줄건지 이 미들웨어에서 정의해줄 겁니다.

//flow는 아래와 같아야 합니다.
//1,3,4 회원가입 -> 성공시 user_id와 recommended_id를 success code와 함께 return 해줌
//-> put point/signup으로 user_id를 body에 넣어 전달
//-> recommended_id가 있으면 put point/recommended로 recommended_id를 body에 넣어 전달
//+ put point/recommender로 user_id를 body에 넣어 전달

//2 출석 -> 성공시 유저 정보 불러오는 api -> isAttend가 0이면 put point/attend 호출 -> isAttend 1로 바꾸기(TODO)
//5,6 추가하기

const Point = require("../models/pointModel.js");

exports.signupPoint = (req, res, next) => {
    const reason = 1;
    const point = 10000;
    const user_id = req.body.user_id;
    req.user_id = user_id;
    req.reason = reason;
    req.point = point;
    next();
};

exports.attendancePoint = async (req, res, next) => {
    const reason = 2;
    const point = 15000;
    const user_id = req.user[0].user_id;
    req.user_id = user_id;
    req.reason = reason;
    req.point = point;

    try {
        const isAttended = await Point.isAttended(user_id);
        console.log(isAttended);
        if (isAttended == 1) {
            return res
                .status(210)
                .json({ success: true, message: "이미 출석했습니다." });
        }
        else if (isAttended == 0) {
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(404).send({ message: "오류가 발생했습니다." });
    }
};

exports.recommendedPoint = (req, res, next) => {
    const reason = 3;
    const point = 20000;
    const user_id = req.body.recommended_id;
    req.user_id = user_id;
    req.reason = reason;
    req.point = point;
    next();
};

exports.recommenderPoint = (req, res, next) => {
    const reason = 4;
    const point = 30000;
    const user_id = req.body.user_id;
    req.user_id = user_id;
    req.reason = reason;
    req.point = point;
    next();
};

exports.wikiEditPoint = async (req, res, next) => {
    try {
        const reason = 5;
        const point = 15000;
        const user_id = req.user[0].user_id;
        req.user_id = user_id;
        req.reason = reason;
        req.point = point;
        const isWikiEdited = await Point.isWikiEdited(user_id);
        console.log(isWikiEdited);
        if (isWikiEdited >= 3) {
            return res
                .status(210)
                .json({ success: true, message: "이미 당일 수정으로 인한 포인트를 모두 받았습니다." });
        }
        else if (isWikiEdited < 3) {
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(404).send({ message: "오류가 발생했습니다." });
    }
};

exports.wikiAccessPoint = async (req, res, next) => {
    try {
        const reason = 6;
        const point = 5000;
        const user_id = req.user[0].user_id;
        req.user_id = user_id;
        req.reason = reason;
        req.point = point;
        const isWikiVisited = await Point.isVisited(user_id);
        if (isWikiVisited == 1) {
            return res
                .status(210)
                .json({ success: true, message: "이미 위키를 방문했습니다." });
        }
        else if (isWikiVisited == 0) {
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(404).send({ message: "오류가 발생했습니다." });
    }
};
