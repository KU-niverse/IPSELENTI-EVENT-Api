const pool = require("../config/db.js");

class User {
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

User.find_user = async (user_id) => {
  const [rows] = await pool.query(`SELECT * FROM users WHERE user_id = ?`, [
    user_id,
  ]);
  return rows;
};

User.create = async (newUser) => {
  const [rows] = await pool.query(`INSERT INTO users SET ?`, [newUser]);
  return rows;
};

User.wikiHistory = async (user_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM wiki_history WHERE editor_id = ?",
    [user_id]
  );

  return rows;
};

User.bettingHistory = async (user_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM betting_history WHERE betting_user = ?",
    [user_id]
  );
  return rows;
};

User.setConstraint = async (user_id) => {
  const [rows] = await pool.query("SELECT * FROM USERS WHERE user_id = ?", [
    user_id,
  ]);
  //유저가 bad가 아니라면 bad를 1로 변경후 true를 반환
  if (rows[0].bad == 0) {
    const [rows] = await pool.query(
      "UPDATE users SET bad = 1 WHERE user_id = ?",
      [user_id]
    );
    return true;
  }
  // 유저가 bad라면 bad를 0으로 변경후 false 반환
  else {
    const [rows] = await pool.query(
      "UPDATE users SET bad = 0 WHERE user_id = ?",
      [user_id]
    );
    return false;
  }
};

module.exports = User;
