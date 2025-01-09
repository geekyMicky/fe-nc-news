import { useState, useContext, useEffect } from 'react';
import { userContext } from '../contexts/userContext';
import { updateVote } from '../api/articles';

const useArticleVotes = (articleId, initialVotes) => {
    const { userVotes, setUserVotes } = useContext(userContext);
    const [votes, setVotes] = useState(initialVotes);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Only update votes state when initialVotes changes
        if (typeof initialVotes === 'number') {
            setVotes(initialVotes);
        }
    }, [initialVotes]);

    const [voteError, setVoteError] = useState(null);

    const hasVoted = !!userVotes[articleId];  //hasn't vote - false
    
    const handleVoteClick = async () => {
        // Update local state optimistically
        const newVotes = { ...userVotes, [articleId]: !hasVoted }; // set to true
        setUserVotes(newVotes);
        setVoteError(null);

        try {
            if (!hasVoted) {
                setVotes(curr => curr + 1); // Always current state
                await updateVote(articleId, 1);
            } else {
                setVotes(curr => curr - 1);
                await updateVote(articleId, -1);
            }
            setIsLoading(false);
        } catch (err) {
            // If API call fails, revert all our changes
            setIsLoading(false);
            setVotes(hasVoted ? curr => curr + 1 : curr => curr - 1);
            setUserVotes({ ...newVotes, [articleId]: hasVoted }); // put it back to false
            setVoteError("Failed to update vote. Please try again.");
        }
    };
  
    return { votes, voteError, handleVoteClick, hasVoted, isLoading };
  };

export default useArticleVotes;