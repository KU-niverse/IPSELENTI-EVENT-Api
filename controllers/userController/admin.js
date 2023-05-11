const User = require("../../models/userModel.js");

exports.setConstraint = async (req, res, next) => {
  try {
    //해당 유저가 존재하는지 확인
    const user = await User.find_user(req.params.userid);
    console.log(req.params.userid);
    const success = user.length != 0;
    if (success == false) {
      return res
        .status(400)
        .json({ success: false, message: "해당 유저가 없습니다." });
    }

    const to_bad = await User.setConstraint(req.params.userid);
    if (to_bad == true) {
      return res
        .status(200)
        .json({ success: true, message: "성공적으로 유저를 제한하였습니다." });
    } else {
      return res.status(200).json({
        success: true,
        message: "성공적으로 유저 제한을 해제하였습니다.",
      });
    }
  } catch (error) {
    console.log("hihi");
    console.error(error);
    return next(error);
  }
};
