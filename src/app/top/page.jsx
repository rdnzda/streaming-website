"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { NavBar, MediaGallery, SearchBar, FilterBar, Footer, TrendingGallery } from "../../components";
import { getTopRatedMovies, nextPage, resetPage, searchMovies, getCurrentPage } from "../../services/api";

export default function TopMovies() {
  const DEBUG = true;
  const renderRef = useRef(0);
  const [movies, setMovies] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState({});
  const { t } = useLanguage();

  // Chargement initial (anti double appel StrictMode)
  const didInitRef = useRef(false);
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    if (DEBUG) console.log('[TopMovies] initial effect run');
    resetPage();
    setMovies([]);
    loadTopRatedMovies(true, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTopRatedMovies = useCallback(async (isInitial = false, replace = false) => {
    if (DEBUG) console.log('[TopMovies] loadTopRatedMovies()', { isInitial, replace, filters, currentPage: getCurrentPage() });
    if (isInitial) setPageLoading(true);
    else setLoadingMore(true);

    try {
  const topRatedMovies = await getTopRatedMovies(filters);
  if (DEBUG) console.log('[TopMovies] API result length', topRatedMovies.length);
      setMovies((prev) => (replace ? topRatedMovies : [...prev, ...topRatedMovies]));
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les films...");
    } finally {
  if (DEBUG) console.log('[TopMovies] loadTopRatedMovies finished', { isInitial, replace });
      if (isInitial) setPageLoading(false);
      else setLoadingMore(false);
    }
  }, [filters]);

  async function handleSearch(query) {
  if (DEBUG) console.log('[TopMovies] handleSearch()', { query });
    if (!query.trim()) {
      resetPage();
      setHasSearched(false);
      setMovies([]);
      loadTopRatedMovies(true, true);
      return;
    }

    try {
      const results = await searchMovies(query);
      setMovies(results);
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la recherche");
    }
  }

  const handleLoadMore = () => {
    if (hasSearched) return; // désactiver "More" en mode recherche
    nextPage();
    loadTopRatedMovies(false);
  };

  useEffect(() => {
    if (DEBUG) console.log('[TopMovies] filters effect', { filters, currentPage: getCurrentPage() });
    resetPage();
    setMovies([]);
    loadTopRatedMovies(true, true);
  }, [loadTopRatedMovies]);

  if (DEBUG) {
    renderRef.current += 1;
    console.log('[TopMovies] render #', renderRef.current, {
      moviesLen: movies.length,
      pageLoading,
      loadingMore,
      hasSearched,
      filters,
      currentPage: getCurrentPage()
    });
  }

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen bg-gray-950">
      <NavBar />
      <main className="pt-[76px] w-full">
        <SearchBar onSearch={handleSearch} />
        <div className="pt-[70px] max-w-7/8 sm:max-w-2xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto w-full">
          <FilterBar onChange={setFilters} initial={{ sort_by: 'vote_average.desc' }} />
          <div className="px-4">
            <MediaGallery
              items={movies}
              pageLoading={pageLoading}
              loadingMore={loadingMore}
              error={error}
              onLoadMore={handleLoadMore}
              canLoadMore={!hasSearched}
              title={t.pages.topRatedMovies}
              mediaType="movie"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}