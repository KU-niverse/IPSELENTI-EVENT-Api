const Request = require('../models/eventModel.js');

// 가수 등록 요청하기
exports.requestPostMid = async (req, res) => {
    try {
        // 빈 내용 요청 시 에러 처리
        if (!req.body){
            res.status(400).send({
                message: "Content can't be empty."
            });
        } else {
            const newRequest = new Request({
                requester_id: req.body.requester_id,
                celebrity_name: req.body.celebrity_name,
                request_reason: req.body.request_reason,
            })
            const id = await Request.createRequest(newRequest);
            res.status(200).send("생성 성공");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
}

// 가수 등록 요청 목록 조회
exports.requestGetByIdMid = async (req, res) => {
    try {
        const requests = await Request.getRequestFromId(req.body.requester_id);
        res.send(requests);
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
}

//내가 베팅한 가수 조회
exports.bettingGetMid = async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(400).send();
    }   
}

//모든 가수 정보 및 배당률 조회
exports.bettingGetAllMid = async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(400).send();
    }   
}