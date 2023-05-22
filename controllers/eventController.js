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
                requester_id: req.user[0].user_id,
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
        const requests = await Request.getRequestFromId(req.user[0].user_id);
        res.status(200).send(requests);
    } catch (error) {
        console.error(error);
        res.status(404).send({message: "오류가 발생했습니다."});
    }
}

// 내가 베팅한 가수 조회
exports.bettingGetMid = async (req, res) => {
    try {
        const bettings = await Betting.getBetting(req.user[0].user_id);
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

// 로그인한 유저가 특정 가수에 베팅한 히스토리 + 총합해서 얼마나 해당 가수에 베팅했는지 + 유저의 현재 남은 포인트 + 전체 가수의 베팅 포인트 총합 조회
exports.BettingHistoryGetMid = async (req, res) => {
    try {
        const result = await BHistory.getBettingFromId(req.user[0].user_id, req.params.artistid);
        let user_total_betting_amount = 0;
        if (result[0]) {
            result[0].forEach(obj => {
                user_total_betting_amount += obj.betting_point;
            });
        }
        const bhistory = result[0];
        const user_point = result[1];
        const betting_amount_sum = await Celebrity.getBettingAmountSum();
        const total_result = {"history": bhistory, "user_total_betting_amount": user_total_betting_amount, "user_point": user_point[0].point,"betting_amount_sum": betting_amount_sum.total_betting_amount}
        res.status(200).send(total_result);
    } catch (error) {
        console.error(error);
        res.status(404).send({message: "오류가 발생했습니다."});
    }
}

// 해당 가수에 베팅하기
exports.BettingPointPutMid = async (req, res) => {
    try {
        const history = await BHistory.getBettingFromId(req.user[0].user_id, req.params.artistid);
        let user_total_betting_amount = 0;
        history[0].forEach(obj => {
            user_total_betting_amount += obj.betting_point;
        });
        if (req.body && req.body.betting_point >= 0 && req.body.betting_point - user_total_betting_amount <= history[1][0].point) {

            let result;

            if (!history[0]) {
                const newBhistroy = new BHistory({
                    celebrity_id: req.params.artistid,
                    betting_user: req.user[0].user_id,
                    betting_point: req.body.betting_point,
                })
                result = await BHistory.putBetting(newBhistroy);
            } else {
                const newBhistroy = new BHistory({
                    celebrity_id: req.params.artistid,
                    betting_user: req.user[0].user_id,
                    betting_point: req.body.betting_point - user_total_betting_amount,
                })
                result = await BHistory.putBetting(newBhistroy);
            }

            if (result.affectedRows != 0) {
                res.status(200).send({message: "베팅을 완료했습니다."});
            } else {
                res.status(403).send({message: "베팅에 실패했습니다."});
            }
        } else {
            res.status(400).send({message: "베팅 포인트에 오류가 발생했습니다."});
        }
    } catch (error) {
        console.error(error);
        res.status(404).send({message: "오류가 발생했습니다."});
    }
}