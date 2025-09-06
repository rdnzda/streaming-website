"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { getTrendingMovies } from "../../services/api";
import { Spinner } from "../ui";
import { LittleMediaCard } from "../cards";
import SimpleBar from "simplebar-react";

export default function TrendingMoviesGallery({ timeWindow = "day" }) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        setLoading(true);
        const movies = await getTrendingMovies(timeWindow);
        setTrendingMovies(movies);
      } catch (err) {
        setError(t.errors.loadMovies);
      } finally {
        setLoading(false);
      }
    };
    loadTrendingMovies();
  }, [timeWindow]);

  if (loading) {
    return (
      <div className="w-full">
        <div className="w-full max-w-[1160px] m-auto mb-4 px-4 sm:px-8">
          <h4 className="font-medium text-base sm:text-lg text-gray-700">{t.navigation.films}</h4>
        </div>
        <div className="max-w-[1160px] m-auto flex items-center justify-center min-h-[220px] px-4 sm:px-8">
          <div className="flex items-center gap-4 text-gray-600 text-sm">
            <Spinner size={20} className="border-2" /> {t.loading.movies}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="w-full max-w-[1160px] m-auto mb-4 px-4 sm:px-8">
          <h4 className="font-medium text-base sm:text-lg text-gray-700">{t.navigation.films}</h4>
        </div>
        <div className="max-w-[1160px] m-auto flex items-center justify-center min-h-[220px] px-4 sm:px-8">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full max-w-[1160px] m-auto mb-4 px-4 sm:px-8">
        <h4 className="font-medium text-base sm:text-lg text-gray-700">{t.navigation.films}</h4>
      </div>
      <div className="max-w-[1160px] m-auto flex content-center px-4 sm:px-8">
        <SimpleBar autoHide={false} className="w-full">
          <div className="flex gap-4 sm:gap-6 pb-2">
            {trendingMovies.map((movie) => (
              <LittleMediaCard 
                key={`movie-${movie.id}`} 
                media={movie} 
                mediaType="movie"
              />
            ))}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}
