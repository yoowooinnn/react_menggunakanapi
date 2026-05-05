/**
 * Format tanggal relatif (misal: "2 jam yang lalu")
 * @param {string} dateString - String tanggal dari API
 */
export const timeAgo = (dateString) => {
  if (!dateString) return '';
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Baru saja';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} hari lalu`;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

/**
 * Potong teks ke panjang tertentu
 * @param {string} text
 * @param {number} maxLength
 */
export const truncate = (text, maxLength = 120) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

/**
 * Dapatkan emoji ikon berdasarkan kategori
 * @param {string} category
 */
export const getCategoryIcon = (category) => {
  const icons = {
    general: '🌐',
    technology: '💻',
    business: '📈',
    sports: '⚽',
    science: '🔬',
    health: '🏥',
    entertainment: '🎬',
  };
  return icons[category] || '📰';
};

/**
 * Dapatkan CSS class tag berdasarkan kategori
 * @param {string} category
 */
export const getCategoryTagClass = (category) => {
  return `category-tag tag-${category}`;
};

/**
 * Dapatkan nama Indonesia dari kategori
 * @param {string} category
 */
export const getCategoryLabel = (category) => {
  const labels = {
    general: 'Umum',
    technology: 'Teknologi',
    business: 'Bisnis',
    sports: 'Olahraga',
    science: 'Sains',
    health: 'Kesehatan',
    entertainment: 'Hiburan',
  };
  return labels[category] || category;
};
