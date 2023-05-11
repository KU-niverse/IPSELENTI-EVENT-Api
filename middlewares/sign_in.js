exports.isSignedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("로그인이 필요합니다.");
    res.status(401).send({ success: false, message: "로그인이 필요합니다." });
  }
};

exports.isNotSignedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    console.log("로그인한 상태입니다.");
    return res
      .status(201)
      .json({ success: true, message: "로그인한 상태입니다." });
  }
};
