import '../../styling/AddComment.css'
import { useState, useContext } from "react";
import { userContext } from '../../contexts/userContext';

const AddComment = ({ onSubmit }) => {
    const [newComment, setNewComment] = useState("");
    const [submitMessage, setSubmitMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useContext(userContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const success = await onSubmit({ 
                body: newComment,
                username: user // changed author to username to match API
            });

            if (success) {
                setNewComment('');
                setSubmitMessage('Comment posted successfully!');
                setTimeout(() => setSubmitMessage(''), 3000);
            }
        } catch (error) {
            setSubmitMessage('Failed to post comment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <>
            {user ? (
                <form onSubmit={handleSubmit} className="comment-form">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        disabled={isSubmitting}
                        placeholder="Add your thoughts..."
                        className="comment-input"
                    />
                    <button 
                        type="submit" 
                        disabled={isSubmitting || !newComment}
                        className="submit-button"
                    >
                        {isSubmitting ? 'Posting...' : 'Add Comment'}
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