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

    //출석
    if (reason == 2) {
        const userAttendUpdate = await pool.query(
            `UPDATE users SET is_attended = 1 WHERE user_id = ?`,
            [user_id]
        );
    }

    //위키 편집
    if(reason == 5){
        const userWikiEditUpdate = await pool.query(
            `UPDATE users SET is_wiki_edited = is_wiki_edited + 1 WHERE user_id = ?`,
            [user_id]
        );
    }

    //위키 첫 접근
    if (reason == 6) {
        const userVisitUpdate = await pool.query(
            `UPDATE users SET is_visited = 1 WHERE user_id = ?`,
            [user_id]
        );
    }

    return userUpdate;
};

Point.isAttended = async (user_id) => {
    const [rows] = await pool.query(
        `SELECT is_attended FROM users WHERE user_id = ?`,
        [user_id]
    );
    return rows[0].is_attended;
};

Point.isVisited = async (user_id) => {
    const [rows] = await pool.query(
        `SELECT is_visited FROM users WHERE user_id = ?`,
        [user_id]
    );
    return rows[0].is_visited;
};

Point.isWikiEdited = async (user_id) => {
    const [rows] = await pool.query(
        `SELECT is_wiki_edited FROM users WHERE user_id = ?`,
        [user_id]
    );
    return rows[0].is_wiki_edited;
};


module.exports = Point;
