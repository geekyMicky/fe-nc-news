import axios from "axios";

const BASE_URL = "https://nc-news-be-project-k6p0.onrender.com/api";

export const getArticleComments = (articleId) => {
    return axios.get(`${BASE_URL}/articles/${articleId}/comments`);
}

export const addComment = (articleId, commentData) => {
    return axios.post(`${BASE_URL}/articles/${articleId}/comments`, commentData);
}

export const deleteComment = (commentId) => {
    return axios.delete(`${BASE_URL}/comments/${commentId}`);
}

export const updateCommentVotes = (commentId, voteChange) => {
    return axios.patch(`${BASE_URL}/comments/${commentId}`, {
        inc_votes: voteChange
    });
}