import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import useArticleVotes from '../../hooks/useArticleVotes';
import axios from 'axios';
import '../../styling/ArticleDetail.css';
import CommentCard from '../comments/CommentCard';
import AddComment  from '../comments/AddComment';
import AuthorDate from './AuthorDate';
import ArticleMeta from './ArticleMeta';
import MetaButtons from '../comments/MetaButtons';

const ArticleDetail = () => {
    const { articleId } = useParams();
    const [comments, setComments] = useState([]);
    const [commentError, setCommentError] = useState(null);
    const [isPosting, setIsPosting] = useState(false); //???

    const { data: articleData, isLoading: articleLoading, error: articleError } 
        = useAxios(`https://nc-news-be-project-k6p0.onrender.com/api/articles/${articleId}`);
    
    const { data: commentsData, isLoading: commentsLoading, error: commentsError }
        = useAxios(`https://nc-news-be-project-k6p0.onrender.com/api/articles/${articleId}/comments`);

    const { votes, voteError, handleVoteClick, hasVoted } = useArticleVotes(
        articleId,
        articleData?.article?.votes
    );


    useEffect(() => {
        if (commentsData?.comments) {
            const sortedInitialComments = commentsData.comments.sort((a, b) => 
                new Date(b.created_at) - new Date(a.created_at)
            );
            setComments(sortedInitialComments);
        }
    }, [commentsData?.comments]);

    const handleAddComment = (newComment) => {
        setIsPosting(true);
        setCommentError(null);
        
        const commentToSend = {
            body: newComment.body,
            author: newComment.author
        };

        axios.post(`https://nc-news-be-project-k6p0.onrender.com/api/articles/${articleId}/comments`, commentToSend)
        .then((response) => {
            setComments(prevComments => [response.data.comment, ...prevComments]);
            setIsPosting(false);
        })
        .catch((error) => {
            console.error("Error adding comment:", error);
            setCommentError("Failed to add comment. Please try again.");
            setIsPosting(false);
        });
    };

    if (articleLoading) return <div>Loading article...</div>;
    if (articleError) return <div>Error: {articleError}</div>;
    if (!articleData || !articleData.article) return <div>Article not found</div>;

    if (commentsLoading) return <div>Loading comments...</div>;
    if (commentsError) return <div>Error loading comments: {commentsError}</div>;
    if (!commentsData || !commentsData.comments) return <div>No comments found</div>;

    const article = articleData.article;
    

    return (
        <article className="article-detail">
            <Link to="/articles" className="back-button">← All articles</Link>
            
            <h2>{article.title}</h2>
            
            <AuthorDate article={article} />
            
            <img src={article.article_img_url} alt={article.title} />
            
            <ArticleMeta article={article} />
            
            <MetaButtons 
                article={article} 
                votes={votes} 
                hasVoted={hasVoted} 
                handleVoteClick={handleVoteClick} 
                voteError={voteError}
            />
            <AddComment handleAddComment={handleAddComment} commentError={commentError} isPosting={isPosting}/>
            <section className="comments-section">
                <h3>Comments</h3>
                {comments.map(comment => (
                    <CommentCard key={comment.comment_id} comment={comment} handleAddComment={handleAddComment} />
                ))}
            </section>
        </article>
    );
};

export default ArticleDetail;