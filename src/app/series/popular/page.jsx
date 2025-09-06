"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { NavBar, MediaGallery, SearchBar, FilterBar, Footer, TrendingGallery } from "../../../components";
import { getPopularSeries, nextPage, resetPage, searchSeries, getCurrentPage } from "../../../services/api";

export default function PopularSeries() {
  const DEBUG = true;
  const renderRef = useRef(0);
  const [series, setSeries] = useState([]);
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
    if (DEBUG) console.log('[PopularSeries] initial effect run');
    resetPage();
    setSeries([]);
    loadPopularSeries(true, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPopularSeries = useCallback(async (isInitial = false, replace = false) => {
    if (DEBUG) console.log('[PopularSeries] loadPopularSeries()', { isInitial, replace, filters, currentPage: getCurrentPage() });
    if (isInitial) setPageLoading(true);
    else setLoadingMore(true);

    try {
  const popularSeries = await getPopularSeries(filters);
  if (DEBUG) console.log('[PopularSeries] API result length', popularSeries.length);
      setSeries((prev) => (replace ? popularSeries : [...prev, ...popularSeries]));
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les séries...");
    } finally {
  if (DEBUG) console.log('[PopularSeries] loadPopularSeries finished', { isInitial, replace });
      if (isInitial) setPageLoading(false);
      else setLoadingMore(false);
    }
  }, [filters]);

  async function handleSearch(query) {
  if (DEBUG) console.log('[PopularSeries] handleSearch()', { query });
    if (!query.trim()) {
      resetPage();
      setHasSearched(false);
      setSeries([]);
      loadPopularSeries(true, true);
      return;
    }

    try {
      const results = await searchSeries(query);
      setSeries(results);
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la recherche");
    }
  }

  const handleLoadMore = () => {
    if (hasSearched) return;
    nextPage();
    loadPopularSeries(false);
  };

  // recharger quand les filtres changent
  useEffect(() => {
    if (DEBUG) console.log('[PopularSeries] filters effect', { filters, currentPage: getCurrentPage() });
    resetPage();
    setSeries([]);
    loadPopularSeries(true, true);
  }, [loadPopularSeries]);

  if (DEBUG) {
    renderRef.current += 1;
    console.log('[PopularSeries] render #', renderRef.current, {
      seriesLen: series.length,
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
        <div className="pt-[60px]">
          <FilterBar onChange={setFilters} />
          <div className="px-4 sm:px-8">
            <MediaGallery
              items={series}
              pageLoading={pageLoading}
              loadingMore={loadingMore}
              error={error}
              onLoadMore={handleLoadMore}
              canLoadMore={!hasSearched}
              title={t.pages.popularSeries}
              mediaType="tv"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
