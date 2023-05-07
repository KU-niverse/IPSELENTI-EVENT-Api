const pool = require('../config/db.js');


// celebrity_request 테이블의 column을 가지는 객체
const Request = function(request) {
    this.requester_id = request.requester_id;
    this.celebrity_name = request.celebrity_name;
    this.request_reason = request.request_reason;
}

// id 넣어주면 해당 id의 request 반환하는 함수
async function getRequest (id) {
    const [rows] = await pool.query(`SELECT * FROM celebrity_request WHERE request_id = ?`, [id]);
    return rows[0];
}

// 새로운 request를 생성해주는 함수
Request.createRequest = async (newRequest) => {
    const [result] = await pool.query("INSERT INTO celebrity_request SET ?", newRequest);
    const id = result.insertId;
    return getRequest(id);
}

// requester_id에 해당하는 request들 반환하는 함수
Request.getRequestFromId = async (requester_id) => {
    const [rows] = await pool.query(`SELECT * FROM celebrity_request WHERE requester_id = ?`, [requester_id]);
    return rows;
}


module.exports = Request;