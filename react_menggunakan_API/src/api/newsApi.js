import axios from 'axios';

// ==============================================
// SUMBER BERITA: KOMPAS & DETIKCOM (via Google News RSS)
// ==============================================
// Menggunakan rss2json.com untuk mengubah RSS ke JSON yang stabil

const RSS_JSON_API = 'https://api.rss2json.com/v1/api.json';

// Query pencarian Google News untuk mendapatkan berita terkini dari sumber tertentu
const GOOGLE_NEWS_RSS = (source) => `https://news.google.com/rss/search?q=source:${source}&hl=id&gl=ID&ceid=ID:id`;

// Mapping kategori ke query pencarian Google News Indonesia
const CATEGORY_QUERIES = {
  general:       'indonesia',
  technology:    'teknologi indonesia',
  business:      'ekonomi bisnis indonesia',
  sports:        'olahraga indonesia',
  science:       'sains indonesia',
  health:        'kesehatan indonesia',
  entertainment: 'hiburan indonesia',
};

/**
 * Ambil berita dari Google News RSS via rss2json
 * @param {string} rssUrl - URL RSS feed
 */
const fetchNewsFromRss = async (rssUrl) => {
  try {
    const response = await axios.get(RSS_JSON_API, {
      params: { rss_url: rssUrl },
    });

    if (response.data.status !== 'ok') return [];

    return response.data.items.map((item) => ({
      title: item.title,
      description: item.description.replace(/<[^>]*>/g, '').trim(),
      url: item.link,
      image: item.thumbnail || item.enclosure?.link || '',
      publishedAt: item.pubDate,
      source: {
        name: item.author || 'Berita Terkini',
      },
    }));
  } catch (err) {
    console.error('Error fetching RSS:', err);
    return [];
  }
};

/**
 * Ambil berita berdasarkan kategori atau sumber (Kompas/Detik)
 * @param {string} category - Kategori berita
 */
export const fetchTopHeadlines = async (category = 'general') => {
  try {
    let articles = [];

    if (category === 'general') {
      // Ambil berita khusus dari Kompas dan Detik untuk halaman utama
      const [kompas, detik] = await Promise.all([
        fetchNewsFromRss(GOOGLE_NEWS_RSS('Kompas.com')),
        fetchNewsFromRss(GOOGLE_NEWS_RSS('detikcom')),
      ]);
      
      // Gabungkan dan selang-seling
      const max = Math.max(kompas.length, detik.length);
      for (let i = 0; i < max; i++) {
        if (kompas[i]) articles.push(kompas[i]);
        if (detik[i]) articles.push(detik[i]);
      }
    } else {
      // Ambil berita umum Indonesia berdasarkan kategori
      const query = CATEGORY_QUERIES[category] || CATEGORY_QUERIES.general;
      const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}+when:7d&hl=id&gl=ID&ceid=ID:id`;
      articles = await fetchNewsFromRss(rssUrl);
    }

    return {
      articles: articles.slice(0, 20),
      totalArticles: articles.length,
      error: null,
    };
  } catch (err) {
    console.error('Error fetching headlines:', err);
    throw new Error('Gagal memuat berita. Periksa koneksi internet Anda.');
  }
};

/**
 * Cari berita berdasarkan kata kunci
 * @param {string} query - Kata kunci pencarian
 */
export const searchNews = async (query) => {
  try {
    const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=id&gl=ID&ceid=ID:id`;
    const articles = await fetchNewsFromRss(rssUrl);

    return {
      articles: articles.slice(0, 20),
      totalArticles: articles.length,
      error: null,
    };
  } catch (err) {
    console.error('Error searching news:', err);
    throw new Error('Gagal mencari berita.');
  }
};
