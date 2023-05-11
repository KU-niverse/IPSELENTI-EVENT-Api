const Comment = require('../models/commentModel.js');

// 댓글 작성하기
exports.commentPostMid = async (req, res) => {
    try {
        // 빈 내용 요청 시 에러 처리
        if (!req.body) {
            res.status(400).send({
                message: "내용을 작성해주세요."
            });
        }
        const newComment = new Comment({
            author: req.body.author,
            comment_content: req.body.comment_content,
        })
        const id = await Comment.createComment(newComment);
        res.status(200).send({message: "댓글을 등록했습니다."});
    } catch (error) {
        console.error(error);
        res.status(404).send({message: "오류가 발생했습니다."});
    }
}

// 댓글 삭제하기
exports.commentDeleteMid = async (req, res) => {
    try {
        await Comment.deleteComment(req.params.comment_id);
        res.status(200).send({message: "댓글을 삭제했습니다."});
    } catch (error) {
        console.error(error);
        res.status(404).send({message: "오류가 발생했습니다."});
    }
}

// 좋아요
exports.commentLikePostMid = async (req, res) => {
    try {
        await Comment.likeComment(req.params.comment_id, req.params.liker_id);
        res.status(200).send({message: "좋아요를 등록했습니다."});
    } catch (error) {
        console.error(error);
        res.status(404).send({message: "오류가 발생했습니다."});
    }
}

// 댓글 최신순 정렬
exports.commentByTimeGetMid = async (req, res) => {
    try {
        const comments = await Comment.orderByTime();
        res.status(200).send(comments);
    } catch (error) {
        console.error(error);
        res.status(404).send({message: "오류가 발생했습니다."});
    }

}

// 댓글 좋아요순 정렬
exports.commentByLikeGetMid = async (req, res) => {
    try {
        const comments = await Comment.orderByLike();
        res.status(200).send(comments);
    } catch (error) {
        console.error(error);
        res.status(404).send({message: "오류가 발생했습니다."});
    } 
}
