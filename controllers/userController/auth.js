const bycrypt = require("bcrypt");
const passport = require("passport");
const User = require("../../models/userModel.js");
const Point = require("../../models/pointModel.js");

//회원가입
exports.signUp = async (req, res, next) => {
  const { user_id, user_name, password, phone_number, recommender_id } =
    req.body;
  try {
    const exUser = await User.find_user(user_id);
    const exRecommender = await User.find_user(recommender_id);
    //유저가 이미 가입되었는지 확인
    if (exUser.length != 0) {
      return res
        .status(409)
        .json({ success: false, message: "이미 가입된 학번입니다." });
    }
    //가입하지 않았다면, 추천인이 실재 존재하는 id인지 확인
    else if (recommender_id != "" && exRecommender.length == 0) {
      return res
        .status(422)
        .json({ success: false, message: "추천인이 존재하지 않습니다." });
    } else {
      const hash = await bycrypt.hash(password, 12);

      await User.create({
        user_id,
        name: user_name,
        password: hash,
        phone_number,
        recommender_id: recommender_id || null,
        point: 0,
        bad: 0,
        is_admin: false,
      });
      await Point.getPoint(user_id, 1, 30000);
      if (exRecommender.length != 0) {
        //추천인이 존재한다면, 추천인, 본인에게 포인트 지급
        await Point.getPoint(recommender_id, 3, 30000);
        await Point.getPoint(user_id, 4, 20000);
      }
      return res
        .status(201)
        .json({
          success: true,
          message: "회원 가입이 완료되었습니다.",
          user_id: user_id,
          recommender_id: recommender_id || null,
        });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
/* 
{
  "user_id": "2019190423",
  "name": "youngsup",
  "password": "young1214!",
  "phone_number": "01053783514",
  "recommender_id": "2016333333"
}
*/

//로그인
exports.signIn = async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      console.log("로그인 성공");
      return res
        .status(201)
        .json({ success: true, message: "로그인에 성공하였습니다!" });
    });
  })(req, res, next);
};

exports.signOut = (req, res) => {
  try {
    req.logout(() => {
      console.log("로그아웃 되었습니다.");
      res.status(200).send({ success: true, message: "로그아웃 되었습니다." });
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
