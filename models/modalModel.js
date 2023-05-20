const pool = require("../config/db.js");
class Modal {
  constructor(user) {
    this.user_id = user.user_id;
  }
}

Modal.getMostBetting = async (id) => {
  const [rows] = await pool.query(
    `SELECT celebrity_id, sum(betting_point) as p1 FROM betting_history WHERE betting_user = ? group by celebrity_id order by p1 desc limit 1`,
    [id]
  );
  return rows[0];
};

module.exports = Modal;
