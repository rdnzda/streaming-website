/**
 * API pour les films
 */

import { tmdbRequest, buildDiscoverParams } from './base.js';

/**
 * Récupère les films populaires
 * @param {Object} options - Options de filtrage
 * @returns {Promise<Array>} - Liste des films populaires
 */
export async function getPopularMovies(options = {}) {
  try {
    const params = buildDiscoverParams("movie", { sort_by: "popularity.desc", ...options });
    const data = await tmdbRequest("/discover/movie", params);
    return data.results;
  } catch (error) {
    console.error("Erreur dans getPopularMovies:", error);
    throw error;
  }
}

/**
 * Récupère les films les mieux notés
 * @param {Object} options - Options de filtrage
 * @returns {Promise<Array>} - Liste des films les mieux notés
 */
export async function getTopRatedMovies(options = {}) {
  try {
    const params = buildDiscoverParams("movie", {
      sort_by: "vote_average.desc",
      'vote_count.gte': options['vote_count.gte'] || 200,
      ...options,
    });
    
    // Exclusion des documentaires et TV movies
    params.without_genres = "99,10755";
    
    const data = await tmdbRequest("/discover/movie", params);
    return data.results;
  } catch (error) {
    console.error("Erreur dans getTopRatedMovies:", error);
    throw error;
  }
}

/**
 * Récupère les films en tendance
 * @param {string} timeWindow - "day" ou "week"
 * @returns {Promise<Array>} - Liste des films en tendance
 */
export async function getTrendingMovies(timeWindow = "day") {
  try {
    const data = await tmdbRequest(`/trending/movie/${timeWindow}`);
    return data.results;
  } catch (error) {
    console.error("Erreur dans getTrendingMovies:", error);
    throw error;
  }
}

/**
 * Recherche de films
 * @param {string} query - Terme de recherche
 * @returns {Promise<Array>} - Résultats de la recherche
 */
export async function searchMovies(query) {
  try {
    const data = await tmdbRequest("/search/movie", { query });
    return data.results;
  } catch (error) {
    console.error("Erreur dans searchMovies:", error);
    throw error;
  }
}

/**
 * Récupère les détails d'un film
 * @param {number} movieId - ID du film
 * @param {string} language - Langue des détails
 * @returns {Promise<Object>} - Détails du film
 */
export async function getMovieDetails(movieId, language = "fr-FR") {
  try {
    return await tmdbRequest(`/movie/${movieId}`, { language });
  } catch (error) {
    console.error("Erreur dans getMovieDetails:", error);
    throw error;
  }
}

/**
 * Récupère les crédits d'un film (casting)
 * @param {number} movieId - ID du film
 * @returns {Promise<Object>} - Crédits du film
 */
export async function getMovieCredits(movieId) {
  try {
    return await tmdbRequest(`/movie/${movieId}/credits`);
  } catch (error) {
    console.error("Erreur dans getMovieCredits:", error);
    throw error;
  }
}

/**
 * Récupère les vidéos (trailers, teasers...) d'un film
 * @param {number} movieId - ID TMDB du film
 * @returns {Promise<Array>} - Liste des vidéos (clé, type, site...)
 */
export async function getMovieVideos(movieId) {
  try {
    const data = await tmdbRequest(`/movie/${movieId}/videos`);
    return data.results || [];
  } catch (error) {
    console.error('Erreur dans getMovieVideos:', error);
    throw error;
  }
}

/**
 * Récupère les avis d'un film
 * @param {number} movieId - ID TMDB du film
 * @returns {Promise<Array>} - Liste des avis
 */
export async function getMovieReviews(movieId) {
  try {
    const data = await tmdbRequest(`/movie/${movieId}/reviews`);
    return data.results || [];
  } catch (error) {
    console.error('Erreur dans getMovieReviews:', error);
    throw error;
  }
}

/**
 * Récupère les trailers récents (films sortis récemment avec vidéo officielle)
 * Stratégie: Discover sur films sortis dans les 30 derniers jours puis fetch vidéos pour les 10 premiers
 */
export async function getRecentMovieTrailers(limit = 12) {
  try {
    const now = new Date();
    const past = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const format = (d) => d.toISOString().slice(0, 10);
    const params = buildDiscoverParams('movie', {
      sort_by: 'primary_release_date.desc',
      'primary_release_date.gte': format(past),
      'primary_release_date.lte': format(now),
      'vote_count.gte': 5,
    });
    const listData = await tmdbRequest('/discover/movie', params);
    const candidates = (listData.results || []).slice(0, 25);
    const trailers = [];
    for (const movie of candidates) {
      if (trailers.length >= limit) break;
      try {
        const vids = await getMovieVideos(movie.id);
        const official = vids.find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
        if (official) {
          trailers.push({
            id: movie.id,
            title: movie.title || movie.original_title,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
            popularity: movie.popularity,
            video_key: official.key,
            video_name: official.name,
            video_type: official.type,
          });
        }
      } catch {/* ignorer */}
    }
    return trailers;
  } catch (error) {
    console.error('Erreur dans getRecentMovieTrailers:', error);
    return [];
  }
}
