import { useState, useEffect } from 'react';
import { getArticleComments, addComment, deleteComment, updateCommentVotes } from '../api/comments';

export const useComments = (articleId) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchComments = async () => {
        try {
            setIsLoading(true);
            const fetchedComments = await getArticleComments(articleId);
            setComments(fetchedComments);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const postComment = async (commentData) => {
        try {
            const newComment = await addComment(articleId, commentData);
            setComments(prev => [newComment, ...prev]);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    }

    const removeComments = async (commentId) => {
        try {
            await deleteComment(commentId);
            setComments(prev => prev.filter(comment => comment.comment_id !== commentId));
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    }

    const voteComment = async (commentId, voteChange) => {
        try {
            await updateCommentVotes(commentId, voteChange);
            setComments(prev => prev.map(comment => {
                if (comment.comment_id === commentId) {
                    return { ...comment, votes: comment.votes + voteChange };
                }
                return comment;
            }));
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    }

    useEffect(() => {
        fetchComments();
    }, [articleId]);

    return {
        comments,
        isLoading,
        error,
        fetchComments,
        postComment,
        removeComments,
        voteComment,
    }
}