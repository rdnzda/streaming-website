"use client";

import { useLanguage } from "../../contexts/LanguageContext";
import { MovieCard } from "../cards";
import { SkeletonGrid, Spinner } from "../ui";

export default function TopRatedGallery({ movies = [], pageLoading, loadingMore, error, onLoadMore, canLoadMore }) {
  const { t } = useLanguage();

  if (pageLoading) {
    return (
      <div className="flex flex-col gap-10">
        <SkeletonGrid />
      </div>
    );
  }

  return (
      <div className="flex flex-col items-start gap-10 pb-10">
      <h2 className="drop-shadow-md font-bold text-2xl">{t.pages.topRatedMovies}</h2>
  <div className="movie-gallery grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-8 items-between justify-between animate-[fadeIn_0.6s_ease] w-full">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
  
        {canLoadMore && (
          <button
            className="px-7 py-2 cursor-pointer rounded bg-gray-800 hover:bg-zinc-800 m-auto flex items-center gap-2 disabled:opacity-60 disabled:cursor-wait"
            onClick={onLoadMore}
            disabled={loadingMore}
          >
            {loadingMore && <Spinner size={16} className="border-2" />}
            {loadingMore ? t.loading.more : t.actions.loadMore}
          </button>
        )}
  
        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }
