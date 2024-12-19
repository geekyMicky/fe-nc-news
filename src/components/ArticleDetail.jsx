import { useParams, Link } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import '../assets/ArticleDetail.css';
import CommentCard from './CommentCard';

const ArticleDetail = () => {
    const { articleId } = useParams();
    const { data: articleData, isLoading: articleLoading, error: articleError } 
        = useAxios(`https://nc-news-be-project-k6p0.onrender.com/api/articles/${articleId}`);
    
    const { data: commentsData, isLoading: commentsLoading, error: commentsError }
        = useAxios(`https://nc-news-be-project-k6p0.onrender.com/api/articles/${articleId}/comments`);

    if (articleLoading) return <div>Loading article...</div>;
    if (articleError) return <div>Error: {articleError}</div>;
    if (!articleData || !articleData.article) return <div>Article not found</div>;

    if (commentsLoading) return <div>Loading comments...</div>;
    if (commentsError) return <div>Error loading comments: {commentsError}</div>;
    if (!commentsData || !commentsData.comments) return <div>No comments found</div>;

    const article = articleData.article;
    const sortedComments = commentsData.comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return (
        <article className="article-detail">
            <Link to="/articles" className="back-button">← All articles</Link>
            
            <h2>{article.title}</h2>
            
            <div className="meta-info">
                <span className="meta-item">
                    <svg viewBox="0 0 24 24">
                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" />
                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" />
                    </svg>
                    By {article.author}
                </span>
                <span className="meta-item">
                    {new Date(article.created_at).toLocaleDateString('en-GB', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </span>
            </div>
            
            <img src={article.article_img_url} alt={article.title} />
            
            <section className="article-meta">
                <span className="meta-item">
                    <svg viewBox="0 0 24 24">
                        <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {article.topic}
                </span>
                
                <p className="article-body">{article.body}</p>
                
                <div className="meta-buttons">
                    <button className="meta-button">
                        <svg viewBox="0 0 24 24">
                            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        {article.comment_count} Comments
                    </button>
                    <button className="meta-button">
                        <svg viewBox="0 0 24 24">
                            <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905c0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        {article.votes} Votes
                    </button>
                </div>
            </section>
            
            <section className="comments-section">
                <h3>Discussion</h3>
                {sortedComments.map(comment => (
                    <CommentCard key={comment.comment_id} comment={comment} />
                ))}
            </section>
        </article>
    );
}

export default ArticleDetail;