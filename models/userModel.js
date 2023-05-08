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

User.wikiHistorys = async (user_id) => {
  console.log(typeof user_id);
  const [rows] = await pool.query(
    "SELECT * FROM wiki_history WHERE editor_id = ?",
    [user_id]
  );
  console.log(rows);
  return rows;
};

module.exports = User;
