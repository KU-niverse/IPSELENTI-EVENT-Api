const pool = require("../config/db.js");

class Point {
  constructor(user) {
    this.user_id = user.user_id;
    this.name = user.name;
    this.password = user.password;
    this.phone_number = user.phone_number;
    this.recommender_id = user.recommender_id;
    this.point = user.point;
    this.bad = user.bad;
    this.is_admin = user.is_admin;
  }
}

//포인트 획득
Point.getPoint = async (user_id, reason, point) => {
  //히스토리 반영필요
  const addPointHistory = await pool.query(
    `INSERT INTO point_history (user_id, reason_id, point_amount) VALUES (?, ?, ?)`,
    [user_id, reason, point]
  );

  //포인트 획득
  const userUpdate = await pool.query(
    `UPDATE users SET point = point + ? WHERE user_id = ?`,
    [point, user_id]
  );
  return userUpdate;
};

module.exports = Point;
