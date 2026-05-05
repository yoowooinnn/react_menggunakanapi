import { getCategoryIcon, getCategoryLabel } from '../utils/helpers';

const CATEGORIES = [
  { id: 'general',       label: 'Semua' },
  { id: 'technology',    label: 'Teknologi' },
  { id: 'business',      label: 'Bisnis' },
  { id: 'sports',        label: 'Olahraga' },
  { id: 'science',       label: 'Sains' },
  { id: 'health',        label: 'Kesehatan' },
  { id: 'entertainment', label: 'Hiburan' },
];

function Navbar({ searchQuery, onSearchChange, onSearchSubmit, activeCategory, onCategoryChange }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSearchSubmit();
  };

  return (
    <header>
      {/* Main navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="navbar-inner">
            {/* Logo */}
            <div className="navbar-logo">
              <div className="logo-icon">📰</div>
              <span className="gradient-text">BeritaKini</span>
            </div>

            {/* Search bar */}
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                id="search-input"
                type="text"
                placeholder="Cari berita terkini..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Cari berita"
              />
            </div>

            <button
              id="search-btn"
              className="search-btn"
              onClick={onSearchSubmit}
              aria-label="Tombol cari"
            >
              Cari
            </button>
          </div>
        </div>
      </nav>

      {/* Category tabs */}
      <nav className="categories-bar" aria-label="Kategori berita">
        <div className="container">
          <div className="categories-inner">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`cat-${cat.id}`}
                className={`cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => onCategoryChange(cat.id)}
                aria-pressed={activeCategory === cat.id}
              >
                <span>{getCategoryIcon(cat.id)}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
