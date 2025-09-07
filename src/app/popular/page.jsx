"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { NavBar, MediaGallery, SearchBar, FilterBar, Footer, TrendingGallery, RecentTrailersGallery } from "../../components";
import { getPopularMovies, nextPage, resetPage, searchMovies, getCurrentPage } from "../../services/api";

export default function PopularMovies() {
  // DEBUG flag temporaire
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
    if (DEBUG) console.log('[PopularMovies] initial effect run');
    resetPage();
    setMovies([]);
    loadPopularMovies(true, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPopularMovies = useCallback(async (isInitial = false, replace = false) => {
    if (DEBUG) console.log('[PopularMovies] loadPopularMovies() called', { isInitial, replace, filters, currentPage: getCurrentPage() });
    if (isInitial) setPageLoading(true);
    else setLoadingMore(true);

    try {
  const popularMovies = await getPopularMovies(filters);
  if (DEBUG) console.log('[PopularMovies] API result length', popularMovies.length);
      setMovies((prev) => (replace ? popularMovies : [...prev, ...popularMovies]));
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les films...");
    } finally {
  if (DEBUG) console.log('[PopularMovies] loadPopularMovies() finished', { isInitial, replace, pageLoadingNext: isInitial ? false : pageLoading, loadingMoreNext: loadingMore });
      if (isInitial) setPageLoading(false);
      else setLoadingMore(false);
    }
  }, [filters]);

  const handleSearch = useCallback(async (query) => {
    if (DEBUG) console.log('[PopularMovies] handleSearch()', { query });
    const trimmed = query.trim();
    if (!trimmed) {
      // Éviter de relancer le chargement si on est déjà dans l'état "liste par défaut"
      if (!hasSearched && movies.length > 0) return;
      resetPage();
      setHasSearched(false);
      setMovies([]);
      await loadPopularMovies(true, true);
      return;
    }
    try {
      const results = await searchMovies(trimmed);
      setMovies(results);
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la recherche");
    }
  }, [loadPopularMovies, hasSearched, movies.length]);

  const handleLoadMore = () => {
    if (hasSearched) return; // désactiver "More" en mode recherche
    nextPage();
    loadPopularMovies(false);
  };

  // recharger quand les filtres changent
  const lastFiltersRef = useRef(null);
  useEffect(() => {
    const serialized = JSON.stringify(filters);
    if (lastFiltersRef.current === serialized) {
      if (DEBUG) console.log('[PopularMovies] filters unchanged, skip reload');
      return;
    }
    lastFiltersRef.current = serialized;
    if (DEBUG) console.log('[PopularMovies] filters effect triggered', { filters, currentPage: getCurrentPage() });
    resetPage();
    setMovies([]);
    loadPopularMovies(true, true);
  }, [filters, loadPopularMovies]);

  // Log à chaque render
  if (DEBUG) {
    if (renderRef.current !== undefined) {
      renderRef.current += 1;
      console.log('[PopularMovies] render #', renderRef.current, {
        moviesLen: movies.length,
        pageLoading,
        loadingMore,
        hasSearched,
        filters,
        currentPage: getCurrentPage()
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen bg-gray-950">
      <NavBar />
      <main className="pt-[76px] w-full">
        <SearchBar onSearch={handleSearch} />
        <div className="pt-[70px] max-w-7/8 sm:max-w-2xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto w-full">
          <FilterBar onChange={setFilters} />
          <div className="px-4">
            <MediaGallery
              items={movies}
              pageLoading={pageLoading}
              loadingMore={loadingMore}
              error={error}
              onLoadMore={handleLoadMore}
              canLoadMore={!hasSearched}
              title={t.pages.popularMovies}
              mediaType="movie"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}