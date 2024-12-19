import '../assets/ArticleList.css'
import useAxios from "../hooks/useAxios";
import ArticleCard from './ArticleCard';

const ArticleList = () => {

    const {data, isLoading, error} = useAxios("https://nc-news-be-project-k6p0.onrender.com/api/articles");

    let sortedArticles = [];
    
    if (data && data.articles) {
        sortedArticles = data.articles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return (
        <div className="ArticleList">
            <h2>Articles</h2>
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {data && data.articles && (
            <ul className="article-list">
                {sortedArticles.map((article) => (
                    <ArticleCard key={article.article_id} article={article} />
                ))}
            </ul>
            )}
        </div>
    );
}

export default ArticleList;

