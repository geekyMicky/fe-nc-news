import '../styling/ArticleMeta.css';

const ArticleMeta = ({ article }) => {
    return (
        <section className="article-meta">
            <span className="meta-item">
                <svg viewBox="0 0 24 24">
                    <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {article.topic}
            </span>
            <p className="article-body">{article.body}</p>
        </section>
    );
};

export default ArticleMeta;