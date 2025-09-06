/**
 * Point d'entrée principal pour tous les services API
 * Réexporte toutes les fonctions API de manière organisée
 */

// Base et utilitaires
export { nextPage, resetPage, getCurrentPage } from './base.js';

// Films
export {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getMovieCredits
} from './movies.js';

// Séries
export {
  getPopularSeries,
  getTopRatedSeries,
  getTrendingSeries,
  searchSeries,
  getSeriesDetails,
  getSeriesCredits
} from './series.js';

// Mixte
export {
  searchAll,
  getTrendingAll
} from './mixed.js';

// Trailers récents et reviews
export { getRecentMovieTrailers, getMovieVideos, getMovieReviews } from './movies.js';
export { getRecentSeriesTrailers, getSeriesVideos, getSeriesReviews } from './series.js';
