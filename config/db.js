const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});


module.exports = pool;

/* exports.getUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}; */

/* 예시코드 */

/* export async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM notes");

  return rows;
}

export async function getNote(id) {
  const [rows] = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);

  return rows[0];
}

export async function createNote(title, contents) {
  const [result] = await pool.query(
    `
  INSERT INTO notes (title, contents)
  VALUES (?, ?)
  `,
    [title, contents]
  );
  const id = result.insertId;
  return getNote(id);
}
 */