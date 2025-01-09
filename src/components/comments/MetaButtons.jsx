import '../../styling/MetaButtons.css';
import useArticleVotes from '../../hooks/useArticleVotes';

const MetaButtons = ({ articleId, commentCount }) => {

    const { votes, voteError, handleVoteClick, hasVoted } = useArticleVotes(articleId);

    return (
        <div className="meta-buttons">
            <button className="meta-button">
                <svg viewBox="0 0 24 24">
                    <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                {commentCount} Comments
            </button>
            <button 
                className={hasVoted ? 'meta-button voted' : 'meta-button'} 
                onClick={handleVoteClick}
            >
                <svg viewBox="0 0 24 24">
                    <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905c0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                {votes} {hasVoted ? 'Voted' : 'Votes'}
            </button>
            {voteError && (
                <div className="vote-error" role="alert">
                    {voteError}
                </div>
            )}
        </div>
    );
};

export default MetaButtons;