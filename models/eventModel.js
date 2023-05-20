const pool = require("../config/db.js");

// celebrity_request 테이블의 column을 가지는 객체
const Request = function (request) {
  this.requester_id = request.requester_id;
  this.celebrity_name = request.celebrity_name;
  this.request_reason = request.request_reason;
};

// id 넣어주면 해당 id의 request 반환하는 함수
async function getRequest(id) {
  const [rows] = await pool.query(
    `SELECT * FROM celebrity_request WHERE request_id = ?`,
    [id]
  );
  return rows[0];
}

// 새로운 request를 생성해주는 함수
Request.createRequest = async (newRequest) => {
  const [result] = await pool.query(
    `INSERT INTO celebrity_request SET ?`,
    newRequest
  );
  const id = result.insertId;
  return getRequest(id);
};

// requester_id에 해당하는 request들 반환하는 함수
Request.getRequestFromId = async (requester_id) => {
  const [rows] = await pool.query(
    `SELECT * FROM celebrity_request WHERE requester_id = ?`,
    [requester_id]
  );
  return rows;
};

// betting_history 테이블의 column을 가지는 객체
const Betting = function (request) {
  this.celebrity_id = request.celebrity_id;
  this.betting_user = request.betting_user;
  this.betting_time = request.betting_time;
};

// user id 넣어주면 해당 id의 전체 베팅 내역 반환해주는 함수
Betting.getBetting = async (id) => {
  const [rows] = await pool.query(
    `SELECT * FROM betting_history WHERE betting_user = ?`,
    [id]
  );
  return rows;
};

// celebrities 테이블의 column을 가지는 객체
const Celebrity = function (request) {
  this.celebrity_id = request.celebrity_id;
  this.celebrity_name = request.celebrity_name;
  this.celebrity_image = request.celebrity_image;
  this.betting_amount - request.betting_amount;
};

// 모든 가수 정보를 반환해주는 함수 (베팅 포인트량 내림차순)
Celebrity.getCelebsAll = async () => {
  const [rows] = await pool.query(
    `SELECT * FROM celebrities ORDER BY betting_amount DESC`
  );
  return rows;
};

// 전체 테이블 betting_amount 총합 반환하는 함수
Celebrity.getBettingAmountSum = async () => {
  const betting_amount_sum = await pool.query(
    `SELECT SUM(betting_amount) AS total_betting_amount FROM celebrities`
  );
  return betting_amount_sum[0][0];
};

// betting_history 테이블의 column을 가지는 객체
const BHistory = function (request) {
  this.betting_id = request.betting_id;
  this.celebrity_id = request.celebrity_id;
  this.betting_user = request.betting_user;
  this.betting_point = request.betting_point;
};

// user_id, celebrity_id를 받으면 해당하는 베팅 내역 반환해주는 함수
BHistory.getBettingFromId = async (user_id, celebrity_id) => {
  const result = await pool.query(
    `SELECT * FROM betting_history WHERE celebrity_id = ? AND betting_user = ?`,
    [celebrity_id, user_id]
  );
  const user_point = await pool.query(
    `SELECT point FROM users WHERE user_id = ?`,
    [user_id]
  );
  return [result[0], user_point];
};

// 베팅하기 함수
BHistory.putBetting = async (newBHistory) => {
  const [result] = await pool.query(
    `INSERT INTO betting_history SET ?`,
    newBHistory
  );
  await pool.query(`UPDATE users SET point = point - ? WHERE user_id = ?`, [
    newBHistory.betting_point,
    newBHistory.betting_user,
  ]);
  await pool.query(
    `UPDATE celebrities SET betting_amount = betting_amount + ? WHERE celebrity_id = ?`,
    [newBHistory.betting_point, newBHistory.celebrity_id]
  );
  return result;
};

module.exports = { Request, Betting, Celebrity, BHistory };
