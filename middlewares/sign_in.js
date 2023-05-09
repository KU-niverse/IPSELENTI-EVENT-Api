exports.isSignedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send({ success: false, message: "로그인이 필요합니다." });
  }
};

exports.isNotSignedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    return res
      .status(201)
      .json({ success: true, message: "로그인한 상태입니다." });
  }
};
