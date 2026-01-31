/**
 * API mixte et utilitaires de recherche
 */

import { tmdbRequest } from './base.js';
import { searchMovies } from './movies.js';
import { searchSeries } from './series.js';
import { searchPeople } from './person.js';

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
      all: [...movies, ...series].sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    };
  } catch (error) {
    console.error("Erreur dans searchAll:", error);
    throw error;
  }
}

/**
 * Recherche globale incluant les personnes (acteurs, réalisateurs)
 * @param {string} query - Terme de recherche
 * @returns {Promise<Object>} - Résultats films, séries, personnes et liste fusionnée
 */
export async function searchAllWithPeople(query) {
  try {
    const [movies, series, people] = await Promise.all([
      searchMovies(query),
      searchSeries(query),
      searchPeople(query)
    ]);
    const peopleWithType = (people || []).map((p) => ({ ...p, media_type: 'person' }));
    const all = [
      ...movies.map((m) => ({ ...m, media_type: 'movie' })),
      ...series.map((s) => ({ ...s, media_type: 'tv' })),
      ...peopleWithType
    ].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    return {
      movies,
      series,
      people: peopleWithType,
      all
    };
  } catch (error) {
    console.error("Erreur dans searchAllWithPeople:", error);
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
