/**
 * API pour les séries TV
 */

import { tmdbRequest, buildDiscoverParams } from './base.js';

/**
 * Récupère les séries populaires
 * @param {Object} options - Options de filtrage
 * @returns {Promise<Array>} - Liste des séries populaires
 */
export async function getPopularSeries(options = {}) {
  try {
    const params = buildDiscoverParams("tv", { sort_by: "popularity.desc", ...options });
    const data = await tmdbRequest("/discover/tv", params);
    return data.results;
  } catch (error) {
    console.error("Erreur dans getPopularSeries:", error);
    throw error;
  }
}

/**
 * Récupère les séries les mieux notées
 * @param {Object} options - Options de filtrage
 * @returns {Promise<Array>} - Liste des séries les mieux notées
 */
export async function getTopRatedSeries(options = {}) {
  try {
    const params = buildDiscoverParams("tv", {
      sort_by: "vote_average.desc",
      'vote_count.gte': options['vote_count.gte'] || 200,
      ...options,
    });
    
    // Exclusion des documentaires
    params.without_genres = "99";
    
    const data = await tmdbRequest("/discover/tv", params);
    return data.results;
  } catch (error) {
    console.error("Erreur dans getTopRatedSeries:", error);
    throw error;
  }
}

/**
 * Récupère les séries en tendance
 * @param {string} timeWindow - "day" ou "week"
 * @returns {Promise<Array>} - Liste des séries en tendance
 */
export async function getTrendingSeries(timeWindow = "day") {
  try {
    const data = await tmdbRequest(`/trending/tv/${timeWindow}`);
    return data.results;
  } catch (error) {
    console.error("Erreur dans getTrendingSeries:", error);
    throw error;
  }
}

/**
 * Recherche de séries
 * @param {string} query - Terme de recherche
 * @returns {Promise<Array>} - Résultats de la recherche
 */
export async function searchSeries(query) {
  try {
    const data = await tmdbRequest("/search/tv", { query });
    return data.results;
  } catch (error) {
    console.error("Erreur dans searchSeries:", error);
    throw error;
  }
}

/**
 * Récupère les détails d'une série
 * @param {number} seriesId - ID de la série
 * @param {string} language - Langue des détails
 * @returns {Promise<Object>} - Détails de la série
 */
export async function getSeriesDetails(seriesId, language = "fr-FR") {
  try {
    return await tmdbRequest(`/tv/${seriesId}`, { language });
  } catch (error) {
    console.error("Erreur dans getSeriesDetails:", error);
    throw error;
  }
}

/**
 * Récupère les crédits d'une série (casting)
 * @param {number} seriesId - ID de la série
 * @returns {Promise<Object>} - Crédits de la série
 */
export async function getSeriesCredits(seriesId) {
  try {
    return await tmdbRequest(`/tv/${seriesId}/credits`);
  } catch (error) {
    console.error("Erreur dans getSeriesCredits:", error);
    throw error;
  }
}

/**
 * Récupère les vidéos associées à une série
 */
export async function getSeriesVideos(seriesId) {
  try {
    const data = await tmdbRequest(`/tv/${seriesId}/videos`);
    return data.results || [];
  } catch (error) {
    console.error('Erreur dans getSeriesVideos:', error);
    throw error;
  }
}

/**
 * Récupère les avis d'une série
 * @param {number} seriesId - ID TMDB de la série
 * @returns {Promise<Array>} - Liste des avis
 */
export async function getSeriesReviews(seriesId) {
  try {
    const data = await tmdbRequest(`/tv/${seriesId}/reviews`);
    return data.results || [];
  } catch (error) {
    console.error('Erreur dans getSeriesReviews:', error);
    throw error;
  }
}

/**
 * Récupère les trailers récents de séries (basé sur first_air_date récent)
 */
export async function getRecentSeriesTrailers(limit = 12) {
  try {
    const now = new Date();
    const past = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const format = (d) => d.toISOString().slice(0, 10);
    const params = buildDiscoverParams('tv', {
      sort_by: 'first_air_date.desc',
      'first_air_date.gte': format(past),
      'first_air_date.lte': format(now),
      'vote_count.gte': 5,
    });
    const listData = await tmdbRequest('/discover/tv', params);
    const candidates = (listData.results || []).slice(0, 25);
    const trailers = [];
    for (const serie of candidates) {
      if (trailers.length >= limit) break;
      try {
        const vids = await getSeriesVideos(serie.id);
        const official = vids.find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
        if (official) {
          trailers.push({
            id: serie.id,
            title: serie.name || serie.original_name,
            first_air_date: serie.first_air_date,
            poster_path: serie.poster_path,
            popularity: serie.popularity,
            video_key: official.key,
            video_name: official.name,
            video_type: official.type,
          });
        }
      } catch {/* ignore */}
    }
    return trailers;
  } catch (error) {
    console.error('Erreur dans getRecentSeriesTrailers:', error);
    return [];
  }
}
