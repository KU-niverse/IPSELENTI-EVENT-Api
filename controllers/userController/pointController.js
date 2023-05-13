const Comment = require("../../models/commentModel.js");
const Point = require("../../models/pointModel.js");
// 유저 point 지급
exports.userGetPoint = async (req, res) => {
  try {
    result = Point.getPoint(req.user[0].user_id);
    console.log(req.user[0]);
    return res
      .status(201)
      .json({ success: true, message: "포인트 지급이 완료되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "오류가 발생했습니다." });
  }
};

/* exports.userUsePoint = async (req, res) => {
  try {
    Point.getPoint(req.user[0]);
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "오류가 발생했습니다." });
  }
}; */
