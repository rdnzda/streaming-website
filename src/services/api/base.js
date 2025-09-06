/**
 * Configuration et utilitaires de base pour l'API TMDB
 */

export const TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;
export const API_URL = "https://api.themoviedb.org/3";

// Gestion de la pagination
let currentPage = 1;

export function nextPage() {
  currentPage += 1;
}

export function resetPage() {
  currentPage = 1;
}

export function getCurrentPage() {
  return currentPage;
}

/**
 * Effectue une requête GET vers l'API TMDB
 * @param {string} endpoint - Endpoint de l'API (sans le préfixe /3)
 * @param {Object} params - Paramètres de query string
 * @returns {Promise<Object>} - Réponse de l'API
 */
export async function tmdbRequest(endpoint, params = {}) {
  const url = new URL(`${API_URL}${endpoint}`);
  
  // Ajouter les paramètres à l'URL
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Erreur API TMDB: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la requête ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Construction dynamique des paramètres pour /discover (movie/tv)
 * @param {string} mediaType - "movie" ou "tv"
 * @param {Object} options - Options de filtrage
 * @returns {Object} - Paramètres formatés pour l'API
 */
export function buildDiscoverParams(mediaType = "movie", options = {}) {
  const params = {
    include_adult: "false",
    language: options.language || "fr-FR",
    page: currentPage.toString(),
  };

  // Paramètre spécifique aux films
  if (mediaType === "movie") {
    params.include_video = "false";
  }

  // Tri
  if (options.sort_by) params.sort_by = options.sort_by;

  // Genres
  if (options.with_genres && options.with_genres.length) {
    params.with_genres = options.with_genres.join(",");
  }

  // Dates - adaptation movies vs TV
  if (mediaType === "movie") {
    if (options.primary_release_year) params.primary_release_year = options.primary_release_year;
    if (options['primary_release_date.gte']) params['primary_release_date.gte'] = options['primary_release_date.gte'];
    if (options['primary_release_date.lte']) params['primary_release_date.lte'] = options['primary_release_date.lte'];
  } else {
    // Pour TV: first_air_date
    if (options.first_air_date_year) params.first_air_date_year = options.first_air_date_year;
    if (options['first_air_date.gte']) params['first_air_date.gte'] = options['first_air_date.gte'];
    if (options['first_air_date.lte']) params['first_air_date.lte'] = options['first_air_date.lte'];
  }

  // Langues originales
  if (options.with_original_language) params.with_original_language = options.with_original_language;

  // Votes
  if (options['vote_average.gte']) params['vote_average.gte'] = options['vote_average.gte'];
  if (options['vote_average.lte']) params['vote_average.lte'] = options['vote_average.lte'];
  if (options['vote_count.gte']) params['vote_count.gte'] = options['vote_count.gte'];

  // Durée (seulement pour movies)
  if (mediaType === "movie") {
    if (options['with_runtime.gte']) params['with_runtime.gte'] = options['with_runtime.gte'];
    if (options['with_runtime.lte']) params['with_runtime.lte'] = options['with_runtime.lte'];
  }

  return params;
}
