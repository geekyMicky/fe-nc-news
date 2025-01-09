import '../../styling/ArticleList.css'
import useAxios from "../../hooks/useAxios";
import ArticleCard from './ArticleCard';
import LoadingSpinner from '../common/LoadingSpinner';

const ArticleList = () => {

    const {data, isLoading, error} = useAxios("https://nc-news-be-project-k6p0.onrender.com/api/articles?sort_by=created_at&order=desc");

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    let sortedArticles = [];
    
    if (data && data.articles) {
        sortedArticles = data.articles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return (
        <div className="ArticleList">
            <h2>Articles</h2>
            {data?.articles?.length ? (
                <ul className="article-list">
                    {data.articles.map((article) => (
                        <ArticleCard key={article.article_id} article={article} />
                    ))}
                </ul>
            ) : (
                <p>No articles found</p>
            )}
        </div>
    );
}

export default ArticleList;
