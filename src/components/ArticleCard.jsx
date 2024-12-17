import '../assets/ArticleCard.css'

const ArticleCard = ({article}) => {
    return (
        <li className="article-card">
            <h3>{article.title}</h3>
            <p>{article.body}</p>
            <p>By: {article.author}</p>
            <p>Topic: {article.topic}</p>
            <p>Date: {new Date(article.created_at).toLocaleDateString()}</p>
            <p>Comments: {article.comment_count}</p>
            <img src={article.article_img_url} alt={article.title} />
            <p>Votes: {article.votes}</p>
        </li>
     );
}
 
export default ArticleCard;