import axios from 'axios';

const BASE_URL = 'https://nc-news-be-project-k6p0.onrender.com/api';

export const getArticle = (articleId) => {
    return axios.get(`${BASE_URL}/articles/${articleId}`);
}

export const getArticles = (sortBy = 'created_at', order = 'desc') => {
    return axios.get(`${BASE_URL}/articles?sort_by=${sortBy}&order=${order}`);
}

export const updateVote = (articleId, voteChange) => {
    return axios.patch(`${BASE_URL}/articles/${articleId}`, {
        inc_votes: voteChange
    });  //to update the votes in the database
};