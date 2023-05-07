const Comment = require('../models/commentModel.js');

// 댓글 작성하기
exports.commentPostMid = async (req, res) => {
    try {
        // 빈 내용 요청 시 에러 처리
        if (!req.body) {
            res.status(400).send({
                message: "Content can't be empty."
            });
        } else {
            const newComment = new Comment({
                author: req.body.author,
                comment_content: req.body.comment_content,
            })
            const id = await Comment.createComment(newComment);
            res.status(200).send("생성 성공");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
}

// 댓글 삭제하기
exports.commentDeleteMid = async (req, res) => {
    try {
        await Comment.deleteComment(req.body.comment_id);
        res.status(200).send("삭제 성공");
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
}

// 좋아요
exports.commentLikePostMid = async (req, res) => {
    try {
        result = await Comment.likeComment(req.body.comment_id, req.body.liker_id);
        if (result) {
            res.status(200).send("좋아요 성공");
        }
        else {
            res.status(400).send({
                message: "Duplicate Like"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
}

// 댓글 최신순 정렬
exports.commentByTimeGetMid = async (req, res) => {
    try {
        const comments = await Comment.orderByTime();
        res.send(comments);
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }

}

// 댓글 좋아요순 정렬
exports.commentByLikeGetMid = async (req, res) => {
    try {
        const comments = await Comment.orderByLike();
        res.send(comments);
    } catch (error) {
        console.error(error);
        res.status(400).send();
    } 
}
