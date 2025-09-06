"use client";

import { useState, useEffect, useRef } from "react";
import { FaFilter, FaCalendarAlt, FaStar, FaSort, FaTimes, FaChevronDown } from "react-icons/fa";
import { useLanguage } from "../../contexts/LanguageContext";

// Liste minimaliste de genres (id TMDB) pour démonstration
const GENRES = [
  { id: 28, nameKey: "action" },
  { id: 12, nameKey: "adventure" },
  { id: 16, nameKey: "animation" },
  { id: 35, nameKey: "comedy" },
  { id: 80, nameKey: "crime" },
  { id: 18, nameKey: "drama" },
  { id: 14, nameKey: "fantasy" },
  { id: 27, nameKey: "horror" },
  { id: 10749, nameKey: "romance" },
  { id: 878, nameKey: "sciFi" },
];

/**
 * Barre de filtres avancée avec design moderne
 * Permet de filtrer par tri, année, note minimale et genres
 */
export default function FilterBar({ onChange, initial = {}, compact = false }) {
  const [sortBy, setSortBy] = useState(initial.sort_by || "popularity.desc");
  const [year, setYear] = useState(initial.primary_release_year || "");
  const [minVote, setMinVote] = useState(initial['vote_average.gte'] || "");
  const [genres, setGenres] = useState(initial.with_genres || []);
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage();

  // Options de tri dynamiques basées sur la traduction
  const SORT_OPTIONS = [
    { value: "popularity.desc", labelKey: "popularityDesc" },
    { value: "popularity.asc", labelKey: "popularityAsc" },
    { value: "primary_release_date.desc", labelKey: "releaseDateDesc" },
    { value: "primary_release_date.asc", labelKey: "releaseDateAsc" },
    { value: "release_date.desc", labelKey: "releaseDateDesc" },
    { value: "release_date.asc", labelKey: "releaseDateAsc" },
    { value: "revenue.desc", labelKey: "revenueDesc" },
    { value: "revenue.asc", labelKey: "revenueAsc" },
    { value: "vote_average.desc", labelKey: "ratingDesc" },
    { value: "vote_average.asc", labelKey: "ratingAsc" },
    { value: "vote_count.desc", labelKey: "voteCountDesc" },
    { value: "vote_count.asc", labelKey: "voteCountAsc" },
  ];

  // Synchroniser les filtres avec le parent
  // Éviter d'appeler onChange avec un objet identique (sinon boucle de re-renders côté parent)
  const lastPayloadRef = useRef(null);
  useEffect(() => {
    const payload = {
      sort_by: sortBy,
      primary_release_year: year || undefined,
      'vote_average.gte': minVote || undefined,
      with_genres: genres.length ? genres : undefined,
    };
    const serialized = JSON.stringify(payload);
    if (serialized !== lastPayloadRef.current) {
      lastPayloadRef.current = serialized;
      onChange(payload);
    }
  }, [sortBy, year, minVote, genres, onChange]);

  const toggleGenre = (id) => {
    setGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const hasActiveFilters = year || minVote || genres.length > 0 || sortBy !== "popularity.desc";

  const resetFilters = () => {
    setSortBy(initial.sort_by || "popularity.desc");
    setYear("");
    setMinVote("");
    setGenres([]);
  };

  return (
    <div className="w-full flex justify-center mt-16 sm:mt-16 lg:mt-40 px-4">
      <div className="w-full max-w-[1160px]">
        {/* Header avec toggle */}
        <div className="mb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center gap-3 w-full sm:w-auto bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-lg border border-gray-700/50 rounded-xl px-6 py-4 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
          >
            <div className="flex items-center gap-2">
              <FaFilter className="text-blue-400" />
              <span className="text-white font-medium">Filtres</span>
            </div>
            
            {hasActiveFilters && (
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            )}
            
            <FaChevronDown 
              className={`text-gray-400 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`} 
            />
          </button>
        </div>

        {/* Panel de filtres */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-8 shadow-2xl">
            {/* Effet de gradient animé */}
            <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl animate-gradient-x"></div>
            
            <div className="relative z-10">
              {/* Header avec reset */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaFilter className="text-blue-400" />
                  Personnaliser votre recherche
                </h3>
                
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                  >
                    <FaTimes className="text-xs" />
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* Filtres principaux */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Tri */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaSort className="text-blue-400" />
                    {t.filters.sort}
                  </label>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full appearance-none bg-gray-800/80 border border-gray-600/50 rounded-xl px-4 py-3 pr-10 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 cursor-pointer hover:bg-gray-700/80"
                    >
                      {SORT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value} className="bg-gray-800">
                          {t.filters.sortOptions[o.labelKey]}
                        </option>
                      ))}
                    </select>
                    <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Année */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaCalendarAlt className="text-green-400" />
                    {t.filters.year}
                  </label>
                  <input
                    type="number"
                    placeholder="2024"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-gray-800/80 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 hover:bg-gray-700/80 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>

                {/* Note minimale */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaStar className="text-yellow-400" />
                    {t.filters.minRating}
                  </label>
                  <input
                    type="number"
                    placeholder="7.0"
                    min="0"
                    max="10"
                    step="0.1"
                    value={minVote}
                    onChange={(e) => setMinVote(e.target.value)}
                    className="w-full bg-gray-800/80 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200 hover:bg-gray-700/80 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </div>
              </div>

              {/* Genres */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Genres
                </h4>
                <div className="flex flex-wrap gap-3">
                  {GENRES.map((g) => {
                    const active = genres.includes(g.id);
                    return (
                      <button
                        key={g.id}
                        onClick={() => toggleGenre(g.id)}
                        className={`relative group px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                          active
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/50"
                            : "bg-gray-800/60 text-gray-300 border border-gray-600/50 hover:border-purple-500/50 hover:text-white hover:bg-gray-700/60"
                        }`}
                      >
                        <span className="relative z-10">{t.genres[g.nameKey]}</span>
                        {active && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
