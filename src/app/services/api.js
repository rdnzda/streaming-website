const TOKEN = process.env.TMDB_BEARER_TOKEN;
const API_URL = "https://api.themoviedb.org/3";

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

export async function getPopularMovies() {

    const url = `${API_URL}/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${currentPage}&sort_by=popularity.desc`;
  
    try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        accept: "application/json",
      },
      cache: "no-store", 
    });

    if (!res.ok) {
      throw new Error(`Erreur API TMDB : ${res.status}`);
    }

    const data = await res.json();
    return data.results; 
  } catch (err) {
    console.error("Erreur dans getPopularMovies:", err);
    throw err;
  }
}

export async function getTopRatedMovies() {
  const url = `${API_URL}/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${currentPage}&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`TMDB API error: ${res.status}`);
    }

    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error("Erreur dans getTopRatedMovies:", err);
    throw err;
  }
}

export async function searchMovies(query) {
  const url = `${API_URL}/search/movie?query=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Erreur TMDB : ${res.status}`);
    }

    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error("Erreur dans searchMovies :", err);
    throw err;
  }
}

export async function getTrendingMovies(timeWindow = "day") {
  const url = `${API_URL}/trending/movie/${timeWindow}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Erreur API TMDB (Trending Movies): ${res.status}`);
    }

    const data = await res.json();
    return data.results; // tableau des films tendances
  } catch (err) {
    console.error("Erreur dans getTrendingMovies:", err);
    throw err;
  }
}