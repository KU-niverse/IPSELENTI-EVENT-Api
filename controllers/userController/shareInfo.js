const Modal = require("../../models/modalModel.js");
// 유저 point 지급
exports.shareInfo = async (req, res) => {
  try {
    const result = await Modal.getMostBetting(req.user[0].user_id);
    console.log(result);
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "오류가 발생했습니다." });
  }
};
