import '../styling/AddComment.css'
import { useState, useContext } from "react";
import { userContext } from '../contexts/userContext';

const AddComment = ({ handleAddComment, isPosting }) => {
    const [newComment, setNewComment] = useState("");
    const [submitMessage, setSubmitMessage] = useState('');
    const { user } = useContext(userContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newComment) {
            const commentData = {
                body: newComment,
                author: user,
                created_at: new Date().toISOString(),
                votes: 0
            };
            handleAddComment(commentData, 
                () => {
                    setNewComment('');
                    setSubmitMessage('Comment posted successfully!');
                    setTimeout(() => setSubmitMessage(''), 3000);
                },
                (error) => {
                    setSubmitMessage('Failed to post comment. Please try again.');
                }
            );
        };
    }
    return (
        <>
            {user ? (
                <form onSubmit={handleSubmit} className="comment-form">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        disabled={isPosting}
                        placeholder="Add your thoughts..."
                        className="comment-input"
                    />
                    <button type="submit" disabled={isPosting ||!newComment} className="submit-button">
                        Add Comment
                    </button>
                    {submitMessage && <p className="submit-message">{submitMessage}</p>}
                </form>
            ) : (
                <p>Please log in to comment</p>
            )}
        </>
    );
};

export default AddComment;