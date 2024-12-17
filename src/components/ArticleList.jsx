import '../assets/ArticleList.css'
import useFetch from "../hooks/useFetch";
import ArticleCard from './ArticleCard';

const ArticleList = () => {

    const {articles, isLoading, error} = useFetch("https://nc-news-be-project-k6p0.onrender.com/api/articles");

    return (
        <div className="ArticleList">
            <h2>Articles</h2>
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <ul className="article-list">
                {articles.map((article) => (
                    <ArticleCard key={article.article_id} article={article} />
                ))}
            </ul>
        </div>
    );
}

export default ArticleList;

