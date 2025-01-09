import { useContext } from 'react';
import { userContext } from '../../contexts/userContext';
import useComments from '../../hooks/useComments';
import AddComment from './AddComment';
import LoadingSpinner from '../common/LoadingSpinner';

const CommentList = ({ articleId }) => {
    const { 
        comments, 
        isLoading, 
        error, 
        addComment, 
        deleteComment 
    } = useComments(articleId);
    const { user } = useContext(userContext);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section className="comments-section">
            <h3>Comments ({comments.length})</h3>
            
            <AddComment 
                onSubmit={addComment} 
                articleId={articleId} 
            />

            {comments.length === 0 ? (
                <p>No comments yet. Be the first to comment!</p>
            ) : (
                comments.map(comment => (
                    <CommentCard 
                        key={comment.comment_id}
                        comment={comment}
                        onDelete={deleteComment}
                        canDelete={user === comment.author} // Permission check for deletion
                    />
                ))
            )}
        </section>
    );
};

export default CommentList;