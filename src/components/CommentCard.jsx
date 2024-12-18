import "../assets/CommentCard.css"

const CommentCard = ({ comment }) => {
    return (
        <div className="comment-card">
            <div className="comment-content">
                <p className="comment-body">{comment.body}</p>
                <div className="comment-meta">
                    <p>By: {comment.author}</p>
                    <p>Date: {new Date(comment.created_at).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="vote-section">
                <button className="vote-button">▲</button>
                <span className="vote-count">{comment.votes}</span>
                <button className="vote-button">▼</button>
            </div>
        </div>
    );
}
 
export default CommentCard;

