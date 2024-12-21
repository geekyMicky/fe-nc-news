import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { userContext } from '../contexts/User';
import useAxios from '../hooks/useAxios';
import axios from 'axios';
import '../styling/ArticleDetail.css';
import CommentCard from './CommentCard';
import AuthorDate from './AuthorDate';
import ArticleMeta from './ArticleMeta';
import MetaButtons from './MetaButtons';

const ArticleDetail = () => {
    const { articleId } = useParams();

    const { userVotes, setUserVotes } = useContext(userContext);
    const [votes, setVotes] = useState(0);

    const { data: articleData, isLoading: articleLoading, error: articleError } 
        = useAxios(`https://nc-news-be-project-k6p0.onrender.com/api/articles/${articleId}`);
    
    const { data: commentsData, isLoading: commentsLoading, error: commentsError }
        = useAxios(`https://nc-news-be-project-k6p0.onrender.com/api/articles/${articleId}/comments`);

    useEffect(() => {
        if (articleData?.article) {
            setVotes(articleData.article.votes);
        }
    }, [articleData]);

    const hasVoted = !!userVotes[articleId];

    const handleVoteClick = () => {
        const newVotes = { ...userVotes, [articleId]: !hasVoted };
        setUserVotes(newVotes);

        if (!hasVoted) {
            setVotes(currentVotes => currentVotes + 1);
            axios.patch(`https://nc-news-be-project-k6p0.onrender.com/api/articles/${articleId}`, {
                inc_votes: 1
            })
            .catch(err => {
                setVotes(currentVotes => currentVotes - 1);
                setUserVotes({ ...newVotes, [articleId]: false });
                console.log(err);
            });
        } else {
            setVotes(currentVotes => currentVotes - 1);
            axios.patch(`https://nc-news-be-project-k6p0.onrender.com/api/articles/${articleId}`, {
                inc_votes: -1
            })
            .catch(err => {
                setVotes(currentVotes => currentVotes + 1);
                setUserVotes({ ...newVotes, [articleId]: true });
                console.log(err);
            });
        }
    };

    if (articleLoading) return <div>Loading article...</div>;
    if (articleError) return <div>Error: {articleError}</div>;
    if (!articleData || !articleData.article) return <div>Article not found</div>;

    if (commentsLoading) return <div>Loading comments...</div>;
    if (commentsError) return <div>Error loading comments: {commentsError}</div>;
    if (!commentsData || !commentsData.comments) return <div>No comments found</div>;

    const article = articleData.article;
    const sortedComments = commentsData.comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    

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
            />
            
            <section className="comments-section">
                <h3>Discussion</h3>
                {sortedComments.map(comment => (
                    <CommentCard key={comment.comment_id} comment={comment} />
                ))}
            </section>
        </article>
    );
};

export default ArticleDetail;