/**
 * API pour les personnes (acteurs, réalisateurs)
 */

import { tmdbRequest } from './base.js';

/**
 * Récupère les détails d'une personne
 * @param {number} personId - ID TMDB de la personne
 * @param {string} language - Langue
 * @returns {Promise<Object>} - Détails (nom, biographie, photo, etc.)
 */
export async function getPersonDetails(personId, language = 'fr-FR') {
  try {
    return await tmdbRequest(`/person/${personId}`, { language });
  } catch (error) {
    console.error('Erreur dans getPersonDetails:', error);
    throw error;
  }
}

/**
 * Récupère les crédits films d'une personne
 * @param {number} personId - ID TMDB de la personne
 * @returns {Promise<Object>} - cast, crew
 */
export async function getPersonMovieCredits(personId) {
  try {
    return await tmdbRequest(`/person/${personId}/movie_credits`);
  } catch (error) {
    console.error('Erreur dans getPersonMovieCredits:', error);
    throw error;
  }
}

/**
 * Récupère les crédits séries d'une personne
 * @param {number} personId - ID TMDB de la personne
 * @returns {Promise<Object>} - cast, crew
 */
export async function getPersonTvCredits(personId) {
  try {
    return await tmdbRequest(`/person/${personId}/tv_credits`);
  } catch (error) {
    console.error('Erreur dans getPersonTvCredits:', error);
    throw error;
  }
}

/**
 * Récupère les crédits combinés (films + séries) d'une personne
 * @param {number} personId - ID TMDB de la personne
 * @returns {Promise<Object>} - cast (films + séries)
 */
export async function getPersonCombinedCredits(personId) {
  try {
    return await tmdbRequest(`/person/${personId}/combined_credits`);
  } catch (error) {
    console.error('Erreur dans getPersonCombinedCredits:', error);
    throw error;
  }
}

/**
 * Recherche de personnes (acteurs, réalisateurs, etc.)
 * @param {string} query - Terme de recherche
 * @returns {Promise<Array>} - Liste des personnes
 */
export async function searchPeople(query) {
  try {
    const data = await tmdbRequest('/search/person', { query });
    return data.results || [];
  } catch (error) {
    console.error('Erreur dans searchPeople:', error);
    throw error;
  }
}
