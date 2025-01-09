import axios from 'axios';

const BASE_URL = 'https://nc-news-be-project-k6p0.onrender.com/api';

export const getArticle = (articleId) => {
    return axios.get(`${BASE_URL}/articles/${articleId}`);
}

export const updateVote = (articleId, voteChange) => {
    return axios.patch(`${BASE_URL}/articles/${articleId}`, {
        inc_votes: voteChange
    });  //to update the votes in the database
};