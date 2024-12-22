import '../styling/AddComment.css'
import { useState, useContext } from "react";
import { userContext } from '../contexts/userContext';

const AddComment = ({ handleAddComment }) => {
    const [newComment, setNewComment] = useState("");
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
            handleAddComment(commentData);
            setNewComment("");
        }
    };

    return (
        <>
            {user ? (
                <form onSubmit={handleSubmit} className="comment-form">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add your thoughts..."
                        className="comment-input"
                    />
                    <button type="submit" className="submit-button">
                        Add Comment
                    </button>
                </form>
            ) : (
                <p>Please log in to comment</p>
            )}
        </>
    );
};

export default AddComment;