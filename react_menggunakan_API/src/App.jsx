import { useState, useEffect, useCallback } from 'react';
import './index.css';
import './App.css';
import Navbar from './components/Navbar';
import NewsCard from './components/NewsCard';
import SkeletonCard from './components/SkeletonCard';
import { fetchTopHeadlines, searchNews } from './api/newsApi';
import { getCategoryIcon, getCategoryLabel } from './utils/helpers';



function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');  // query yang sedang ditampilkan
  const [category, setCategory] = useState('general');
  const [totalArticles, setTotalArticles] = useState(0);
  const [isSearchMode, setIsSearchMode] = useState(false);

  // ----- Fetch berita -----
  const loadNews = useCallback(async (cat, query = '') => {
    setLoading(true);
    setError(null);
    try {
      let result;
      if (query.trim()) {
        result = await searchNews(query.trim());
        setIsSearchMode(true);
      } else {
        result = await fetchTopHeadlines(cat);
        setIsSearchMode(false);
      }
      setArticles(result.articles);
      setTotalArticles(result.totalArticles);
    } catch (err) {
      setError(err.message);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load pertama kali
  useEffect(() => {
    loadNews(category);
  }, [category, loadNews]);

  // ----- Handler -----
  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    setActiveQuery(searchQuery);
    loadNews(category, searchQuery);
  };

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    setSearchQuery('');
    setActiveQuery('');
    setIsSearchMode(false);
    loadNews(newCat);
  };

  const handleRetry = () => loadNews(category, activeQuery);

  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveQuery('');
    setIsSearchMode(false);
    loadNews(category);
  };

  // ----- Render -----
  const renderContent = () => {
    if (loading) {
      return (
        <div className="news-grid">
          {Array.from({ length: 9 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="state-container">
          <div className="state-icon">⚠️</div>
          <h2 className="state-title">Gagal Memuat Berita</h2>
          <p className="state-desc">{error}</p>
          <button className="retry-btn" onClick={handleRetry}>
            🔄 Coba Lagi
          </button>
        </div>
      );
    }

    if (articles.length === 0) {
      return (
        <div className="state-container">
          <div className="state-icon">🔍</div>
          <h2 className="state-title">Tidak Ada Hasil</h2>
          <p className="state-desc">
            {isSearchMode
              ? `Tidak ditemukan berita untuk "${activeQuery}". Coba kata kunci lain.`
              : 'Tidak ada berita tersedia saat ini. Coba lagi nanti.'}
          </p>
          {isSearchMode && (
            <button className="retry-btn" onClick={handleClearSearch}>
              ← Kembali ke Beranda
            </button>
          )}
        </div>
      );
    }

    return (
      <div className={`news-grid ${articles.length > 2 ? 'has-featured' : ''}`}>
        {articles.map((article, index) => (
          <NewsCard
            key={article.url || index}
            article={article}
            category={category}
            index={index}
            isFeatured={index === 0}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Navbar + Categories */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        activeCategory={category}
        onCategoryChange={handleCategoryChange}
      />

      {/* Hero */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">
            Berita <span className="gradient-text">Terkini</span><br />

          </h1>
          <p className="hero-subtitle">
            Tetap terinformasi dengan berita terbaru dari berbagai kategori,
            diperbarui setiap saat.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">{totalArticles > 0 ? totalArticles.toLocaleString() : '—'}</div>
              <div className="stat-label">Total Artikel</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">7</div>
              <div className="stat-label">Kategori</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">Live</div>
              <div className="stat-label">Update Real-time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="main-content">
        <div className="container">



          {/* Section Header */}
          <div className="section-header">
            <h2 className="section-title">
              <span className="dot"></span>
              {isSearchMode
                ? `Hasil Pencarian: "${activeQuery}"`
                : `${getCategoryIcon(category)} ${getCategoryLabel(category)}`}
            </h2>
            {!loading && articles.length > 0 && (
              <div className="results-count">
                {articles.length} artikel ditampilkan
                {isSearchMode && (
                  <button
                    onClick={handleClearSearch}
                    style={{
                      marginLeft: 12,
                      background: 'none',
                      color: 'var(--accent-primary)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: 'none',
                    }}
                  >
                    ✕ Hapus pencarian
                  </button>
                )}
              </div>
            )}
          </div>

          {/* News Cards */}
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container">
          <p>
            © 2025 <span>BeritaKini</span> — Dibuat dengan ❤️ menggunakan React &amp; News API
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
