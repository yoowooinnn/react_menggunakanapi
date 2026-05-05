import { timeAgo, getCategoryTagClass, getCategoryLabel } from '../utils/helpers';

const FALLBACK_IMAGES = {
  general: '🌐',
  technology: '💻',
  business: '📊',
  sports: '⚽',
  science: '🔬',
  health: '🏥',
  entertainment: '🎬',
};

function NewsCard({ article, category, index, isFeatured }) {
  const handleClick = () => {
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  const animationDelay = { animationDelay: `${index * 0.07}s`, opacity: 0 };

  return (
    <div
      className="news-card animate-fade-in-up"
      style={animationDelay}
      onClick={handleClick}
      role="article"
      aria-label={article.title}
    >
      {/* Gambar */}
      <div className="news-card-image">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className="img-placeholder"
          style={{ display: article.image ? 'none' : 'flex' }}
        >
          {FALLBACK_IMAGES[category] || '📰'}
        </div>
        <span className={getCategoryTagClass(category)}>
          {getCategoryLabel(category)}
        </span>
      </div>

      {/* Body */}
      <div className="news-card-body">
        <div className="news-card-source">
          <span className="source-name">
            <span className="source-dot"></span>
            {article.source?.name || 'Sumber Tidak Diketahui'}
          </span>
          <span className="time-ago">{timeAgo(article.publishedAt)}</span>
        </div>

        <h2 className="news-card-title">{article.title}</h2>

        {article.description && (
          <p className="news-card-desc">{article.description}</p>
        )}

        <div className="news-card-footer">
          <button className="read-more-btn" onClick={handleClick}>
            Baca Selengkapnya
            <span>→</span>
          </button>
          <span className="time-ago">
            {new Date(article.publishedAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
