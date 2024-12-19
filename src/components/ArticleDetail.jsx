import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import '../assets/ArticleDetail.css';
import CommentCard from './CommentCard';

const ArticleDetail = () => {
    const { articleId } = useParams();
    const { data: articleData, isLoading: articleLoading, error: articleError } 
        = useFetch(`https://nc-news-be-project-k6p0.onrender.com/api/articles/${articleId}`);
    
    const { data: commentsData, isLoading: commentsLoading, error: commentsError }
        = useFetch(`https://nc-news-be-project-k6p0.onrender.com/api/articles/${articleId}/comments`);

    if (articleLoading) return <div>Loading article...</div>;
    if (commentsLoading) return <div>Loading comments...</div>;
    if (articleError) return <div>Error: {articleError}</div>;
    if (commentsError) return <div>Error loading comments: {commentsError}</div>;
    if (!articleData || !articleData.article ) return <div>Article not found</div>;
    if (!commentsData || !commentsData.comments) return <div>No comments found</div>;

    const article = articleData?.article;
    let sortedComments = [];
    if (commentsData && commentsData.comments) {
        sortedComments = commentsData.comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return (
        <div className="article-detail">
            <Link to="/articles" className="back-button">← Back to Articles</Link>
            <h2>{article.title}</h2>
            <img src={article.article_img_url} alt={article.title} />
            <p className="article-body">{article.body}</p>
            <div className = "article-meta">
                <p>By: {article.author}</p>
                <p>Topic: {article.topic}</p>
                <p>Date: {new Date(article.created_at).toLocaleDateString()}</p>
                <p>Comments: {article.comment_count}</p>
                <p>Votes: {article.votes}</p>
            </div>
            <div className="comments-section">
                <h3>Comments</h3>
                {sortedComments.map(comment => (
                    <CommentCard key={comment.comment_id} comment={comment}/>
                ))}
            </div>
        </div>
    );
}

export default ArticleDetail;
