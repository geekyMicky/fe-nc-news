import { useState, useEffect } from "react";
import axios from 'axios'
import ArticleCard from './ArticleCard'
import './ArticleList.css'; 

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        axios.get("https://nc-news-be-project-k6p0.onrender.com/api/articles").then((response) => {
            const sortedArticles = response.data.articles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            setArticles(sortedArticles);
        })
        .catch((error) => {
            console.log("Error fetching articles:", error);
        });
    }, []);


    return (
        <div className="ArticleList">
            <h2>Articles</h2>
            <ul className="article-list">
                {articles.map((article) => (
                    <ArticleCard key={article.article_id} article={article} />
                ))}
            </ul>
        </div>
    );
}

export default ArticleList;

