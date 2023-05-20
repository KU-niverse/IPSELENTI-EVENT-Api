const User = require("../../models/userModel.js");
//유저가 로그인 되었을때만 접근 가능
//유저 정보 불러오기
exports.info = (req, res, err) => {
  try {
    return res.status(200).json({ success: true, user: req.user[0] });
  } catch (error) {
    console.error(error);
    return next(error);
  }
  //만약 한 유저가 다른 유저 정보 찾는 것 필요하다면 아래 코드 활용
  /* User.find_user_id(req.params.user_id)
    .then((user) => {
      res.status(200).json({ success: true, user: req.user[0] }); //user[0]으로 해야지 user가 나옴
      return;
    })
    .catch((err) => {
      res.status(400).json({ success: false, err: "해당 유저가 없음" });
      return;
    }); */
};

//get user wiki history
exports.wikiHistory = async (req, res, err) => {
  try {
    const userHistory = await User.wikiHistory(req.user[0].user_id);
    return res.status(200).json({
      success: true,
      wikiHistory: userHistory || [],
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

//get user betting history
exports.bettingHistory = async (req, res, next) => {
  try {
    const userHistory = await User.bettingHistory(req.user[0].user_id);
    return res.status(200).json({
      success: true,
      bettingHistory: userHistory || [],
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
