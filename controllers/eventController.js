const {Request, Betting, Celebrity, BHistory} = require('../models/eventModel.js');

// 가수 등록 요청하기
exports.requestPostMid = async (req, res) => {
    try {
        // 빈 내용 요청 시 에러 처리
        if (!req.body){
            res.status(400).send({
                message: "내용을 작성해주세요."
            });
        } else {
            const newRequest = new Request({
                requester_id: req.body.requester_id,
                celebrity_name: req.body.celebrity_name,
                request_reason: req.body.request_reason,
            })
            const id = await Request.createRequest(newRequest);
            res.status(200).send({message: "요청을 완료했습니다."});
        }
    } catch (error) {
        console.error(error);
        res.status(404).send({message: "오류가 발생했습니다."});
    }
}

// 가수 등록 요청 목록 조회
exports.requestGetByIdMid = async (req, res) => {
    try {
        const requests = await Request.getRequestFromId(req.body.requester_id);
        res.status(200).send(requests);
    } catch (error) {
        console.error(error);
        res.status(404).send({message: "오류가 발생했습니다."});
    }
}

// 내가 베팅한 가수 조회
exports.bettingGetMid = async (req, res) => {
    try {
        const bettings = await Betting.getBetting(req.params.userid);
        res.status(200).send(bettings);
    } catch (error) {
        console.error(error);
        res.status(404).send({message: "오류가 발생했습니다."});
    }
}

// 모든 가수 정보 및 총 베팅 금액 조회
exports.celebsGetAllMid = async (req, res) => {
    try {
        const celebrities = await Celebrity.getCelebsAll();
        const betting_amount_sum = await Celebrity.getBettingAmountSum();
        const result = {celebrities, "betting_amount_sum": betting_amount_sum.total_betting_amount};
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(404).send({message: "오류가 발생했습니다."});
    }   
}

// 해당 가수에 베팅하기
exports.BettingPointPutMid = async (req, res) => {
    try {
        if (req.body) {
            const newBhistroy = new BHistory({
                celebrity_id: req.params.artistid,
                betting_user: req.params.userid,
                betting_point: req.body.betting_point,
            })
            const [result] = await BHistory.putBetting(newBhistroy);
            if (result.affectedRows != 0) {
                res.status(200).send({message: "베팅을 완료했습니다."});
            }
            else {
                res.status(403).send({message: "베팅에 실패했습니다."});
            }
        } else {
            res.status(400).send({message: "베팅할 포인트를 입력해주세요."});
        }
    } catch (error) {
        console.error(error);
        res.status(404).send({message: "오류가 발생했습니다."});
    }
}