"use client";

import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import PopularGallery from "../components/PopularGallery";
import SearchBar from "../components/SearchBar";
import { getPopularMovies, nextPage, resetPage, searchMovies } from "../services/api";
import Footer from "../components/Footer";
import TrendingGallery from "../components/TrendingGallery";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    resetPage();
  }, []);

  async function loadPopularMovies(isInitial = false) {
    if (isInitial) setPageLoading(true);
    else setLoadingMore(true);

    try {
      const popularMovies = await getPopularMovies();
      setMovies((prev) => [...prev, ...popularMovies]);
    } catch (err) {
      console.error(err);
      setError("Failed to load movies...");
    } finally {
      if (isInitial) setPageLoading(false);
      else setLoadingMore(false);
    }
  }

  async function handleSearch(query) {
    if (!query.trim()) {
      resetPage();
      setHasSearched(false);
      setMovies([]); // ← vide l'ancien état
      loadPopularMovies(true); // ← recharge normalement
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
    loadPopularMovies(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <NavBar />
      <SearchBar onSearch={handleSearch} />
      <main className="mt-40">
        <PopularGallery
          movies={movies}
          pageLoading={pageLoading}
          loadingMore={loadingMore}
          error={error}
          onLoadMore={handleLoadMore}
          canLoadMore={!hasSearched}
        />
      </main>
      <TrendingGallery/>
      <Footer/>
    </div>
  );
}