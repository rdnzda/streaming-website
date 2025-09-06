"use client";

import { useLanguage } from "../../contexts/LanguageContext";
import { MediaCard } from "../cards";
import { Spinner, SkeletonGrid } from "../ui";
import { useMemo } from "react";

/**
 * Galerie de médias générique
 * Affiche une grille de cartes avec pagination et gestion d'états
 */
export default function MediaGallery({ 
  items = [], 
  pageLoading, 
  loadingMore, 
  error, 
  onLoadMore, 
  canLoadMore, 
  title,
  mediaType = "movie" 
}) {
  const { t } = useLanguage();

  // Déduplication des éléments par id (évite les warnings React keys dupliquées)
  const uniqueItems = useMemo(() => {
    const seen = new Set();
    const result = [];
    for (const it of items) {
      if (it && it.id != null && !seen.has(it.id)) {
        seen.add(it.id);
        result.push(it);
      }
    }
    if (process.env.NODE_ENV !== 'production' && result.length !== items.length) {
      console.debug('[MediaGallery] duplicates removed', { before: items.length, after: result.length });
    }
    return result;
  }, [items]);

  if (pageLoading) {
    return (
      <div className="flex flex-col gap-10">
        <SkeletonGrid />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-6 sm:gap-8 lg:gap-10 pb-10 w-full max-w-7xl mx-auto">
      {/* Titre */}
      {title && (
        <h2 className="drop-shadow-md font-bold text-xl sm:text-2xl px-4 sm:px-0">{title}</h2>
      )}

      {/* Grille de cartes responsive */}
      <div className="movie-gallery grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 items-center justify-center animate-[fadeIn_0.6s_ease] w-full px-4 sm:px-0">
        {uniqueItems.map((item, index) => (
          <MediaCard
            media={item}
            key={item.id}
            mediaType={mediaType}
          />
        ))}
      </div>

      {/* Bouton "Charger plus" */}
      {canLoadMore && (
        <button
          className="px-6 sm:px-7 py-2 cursor-pointer rounded bg-gray-900 hover:bg-gray-800 mx-auto flex items-center gap-2 disabled:opacity-60 disabled:cursor-wait transition-all duration-200 text-sm sm:text-base"
          onClick={onLoadMore}
          disabled={loadingMore}
          aria-label={loadingMore ? t.loading.more : t.actions.loadMore}
        >
          {loadingMore && <Spinner size={16} className="border-2" />}
          {loadingMore ? t.loading.more : t.actions.loadMore}
        </button>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="text-red-500 bg-red-100 dark:bg-red-900/20 p-4 rounded-lg m-auto">
          {error}
        </div>
      )}
    </div>
  );
}
