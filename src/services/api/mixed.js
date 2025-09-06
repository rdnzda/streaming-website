/**
 * API mixte et utilitaires de recherche
 */

import { tmdbRequest } from './base.js';
import { searchMovies } from './movies.js';
import { searchSeries } from './series.js';

/**
 * Recherche globale (films + séries)
 * @param {string} query - Terme de recherche
 * @returns {Promise<Object>} - Résultats organisés par type
 */
export async function searchAll(query) {
  try {
    const [movies, series] = await Promise.all([
      searchMovies(query),
      searchSeries(query)
    ]);
    
    return {
      movies,
      series,
      all: [...movies, ...series].sort((a, b) => b.popularity - a.popularity)
    };
  } catch (error) {
    console.error("Erreur dans searchAll:", error);
    throw error;
  }
}

/**
 * Récupère le contenu en tendance (tous types confondus)
 * @param {string} timeWindow - "day" ou "week"
 * @returns {Promise<Array>} - Liste du contenu en tendance
 */
export async function getTrendingAll(timeWindow = "day") {
  try {
    const data = await tmdbRequest(`/trending/all/${timeWindow}`);
    return data.results;
  } catch (error) {
    console.error("Erreur dans getTrendingAll:", error);
    throw error;
  }
}
