const pool = require("../config/db.js");


// comments 테이블의 column을 가지는 객체
const Comment = function(comment) {
    this.author = comment.author;
    this.comment_content = comment.comment_content;
}

// id 넣어주면 해당 id의 comment 반환하는 함수
Comment.getComment = async (id) => {
    const [rows] = await pool.query(`SELECT * FROM comments WHERE comment_id = ?`, [id]);
    return rows[0];
}

// 새로운 comment를 생성해주는 함수
Comment.createComment = async (newComment) => {
    const [result] = await pool.query("INSERT INTO comments SET ?", newComment);
    const id = result.insertId;
    return getComment(id);
}

// 주어진 id의 comment를 삭제해주는 함수
Comment.deleteComment = async (id) => {
    pool.query(`DELETE FROM comments WHERE comment_id=?`, [id], (err, res) => {
        if(res.affectedRows == 0){
            //id 결과가 없을 시
            console.log("Comment를 찾을 수 없습니다.")
            return;
        }

        console.log("deleted comment with id: ", id);
        return;
    });
};

// comment의 좋아요를 증가시키는 함수
Comment.likeComment = async (comment, liker) => {
    const [flag] = await pool.query(`SELECT * FROM comments_like WHERE comment_id=? AND liker_id=?`, [comment, liker]);
    if (![flag]) {
        const result = 0 //error?
    } else {
        const [result] = await pool.query(`UPDATE comments SET likes_count = likes_count + 1 WHERE comment_id=?`, [comment], (err, res) => {
            if(err) {
                console.log("error: ", err);
                return;
            }
            console.log("update likes with id: ", comment);
        });
    return result;
    }
};

// 댓글을 최신순으로 정렬하여 반환하는 함수
Comment.orderByTime = async () => {
    const [rows] = await pool.query(`SELECT * FROM comments ORDER BY comment_time DESC`);
    return rows;
};

// 댓글을 좋아요순으로 정렬하여 반환하는 함수
Comment.orderByLike = async () => {
    const [rows] = await pool.query(`SELECT * FROM comments ORDER BY likes_count DESC`);
    return rows;
};


module.exports = Comment;