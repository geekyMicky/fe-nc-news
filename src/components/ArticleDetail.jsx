import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import '../assets/ArticleDetail.css';

const ArticleDetail = () => {
    const { articleId } = useParams();
    const { data, isLoading, error } = useFetch(`https://nc-news-be-project-k6p0.onrender.com/api/articles/${articleId}`);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!data) {
        return null;
    }
    if (!data.article) {
        return <div>Article not found</div>;
    }

    const article = data.article;

    return (
        <div className="article-detail">
            <Link to="/articles" className="back-button">← Back to Articles</Link>
            <h2>{article.title}</h2>
            <img src={article.article_img_url} alt={article.title} />
            <p className="article-body">{article.body}</p>
            <>
                <p>By: {article.author}</p>
                <p>Topic: {article.topic}</p>
                <p>Date: {new Date(article.created_at).toLocaleDateString()}</p>
                <p>Comments: {article.comment_count}</p>
                <p>Votes: {article.votes}</p>
            </>
            <CommentCard articleId={articleId} />
        </div>
    );
}

export default ArticleDetail;
