import axios from 'axios';

const BASE_URL = 'https://nc-news-be-project-k6p0.onrender.com/api';

export const updateVote = (articleId, voteChange) => {
    return axios.patch(`${BASE_URL}/articles/${articleId}`, {
        inc_votes: voteChange
    });  //这个是用来给后端更新vote数量的，需要提供文章id和vote变化值
};