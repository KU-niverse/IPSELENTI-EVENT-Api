const pool = require("../config/db.js");
class Modal {
  constructor(user) {
    this.user_id = user.user_id;
  }
}

Modal.getMostBetting = async (id, name, point) => {
  const [rows] = await pool.query(
    `SELECT celebrity_id, sum(betting_point) as p1 FROM betting_history WHERE betting_user = ? group by celebrity_id order by p1 desc limit 1`,
    [id]
  );
  const [rows2] = await pool.query(
    `select celebrities_name, betting_amount  from celebrities where celebrity_id = ?`,
    [rows[0].celebrity_id]
  );
  const [rows3] = await pool.query(
    `select sum(betting_amount) from celebrities`
  );
  const [rows4] = await pool.query(
    `select * from celebrities where celebrity_id = ?`,
    [rows[0].celebrity_id]
  );
  const result = {
    user_name: name,
    celebrity_name: rows2[0].celebrities_name,
    betting_amount: rows2[0].betting_amount,
    total_amount: rows3[0]["sum(betting_amount)"],
    user_point: point,
  };
  return result;
};

module.exports = Modal;
