import '../assets/ArticleCard.css'
import { Link } from 'react-router-dom';

const ArticleCard = ({article}) => {
    return (
        <li className="article-card">
            <Link to={`/articles/${article.article_id}`}>
            <h3>{article.title}</h3>
            <p>By: {article.author}</p>
            <p>Topic: {article.topic}</p>
            <p>Date: {new Date(article.created_at).toLocaleDateString()}</p>
            <p>Comments: {article.comment_count}</p>
            <img src={article.article_img_url} alt={article.title} />
            <p>Votes: {article.votes}</p>
            </Link>
        </li>
     );
} 
 
export default ArticleCard;