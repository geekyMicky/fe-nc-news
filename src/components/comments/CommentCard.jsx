import "../../styling/CommentCard.css"
import { useState } from 'react';

const CommentCard = ({ comment, onVote }) => {

    const [isVoting, setIsVoting] = useState(false)

    const handleVote = async (voteChange) => {
        if (isVoting) return; // Prevent multiple clicks
        setIsVoting(true);
        try {
            await onVote(comment.comment_id, voteChange);
        } finally {
            setIsVoting(false);
        }
    };

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
                <button 
                    className="vote-button"
                    onClick={() => handleVote(1)}
                    disabled={isVoting}
                >▲</button>
                <span className="vote-count">{comment.votes}</span>
                <button 
                    className="vote-button"
                    onClick={() => handleVote(-1)}
                    disabled={isVoting}
                >▼</button>
            </div>
        </div>
    );
};
 
export default CommentCard;

