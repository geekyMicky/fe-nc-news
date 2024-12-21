import '../styling/AuthorDate.css';

const AuthorDate = ({ article }) => {
    return (
        <div className="author-date">
            <span className="meta-item">
                <svg viewBox="0 0 24 24">
                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" />
                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" />
                </svg>
                By {article.author}
            </span>
            <span className="meta-item">
                {new Date(article.created_at).toLocaleDateString('en-GB', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </span>
        </div>
    );
};

export default AuthorDate;