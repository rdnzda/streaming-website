"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ArrowRight, Film, Tv, Star, Calendar, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../contexts/LanguageContext";
import { searchAllWithPeople } from "../../services/api";

/**
 * Barre de recherche moderne pour la page d'accueil
 * Design glassmorphism avec suggestions en temps réel
 */
export default function HomeSearchBar({ variant = 'contrast', onSuggestionsChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();
  const searchTimeout = useRef(null);
  const suggestionsRef = useRef(null);

  // Notifier le parent quand l'état des suggestions change
  useEffect(() => {
    const hasActiveSuggestions = showSuggestions && suggestions.length > 0;
    console.log("HomeSearchBar: notifying parent", hasActiveSuggestions);
    if (onSuggestionsChange) {
      onSuggestionsChange(hasActiveSuggestions);
    }
  }, [showSuggestions, suggestions.length, onSuggestionsChange]);

  // Fonction de recherche avec debouncing
  const searchSuggestions = async (query) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    try {
      const results = await searchAllWithPeople(query);
      const topResults = results.all.slice(0, 10);
      setSuggestions(topResults);
      if (topResults.length > 0) {
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Erreur de recherche:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setLoading(false);
    }
  };

  // Effet pour le debouncing de la recherche
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      searchSuggestions(searchQuery);
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchQuery]);

  // Fermer les suggestions en cliquant ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/people?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (item) => {
    const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
    const id = item.id;

    setShowSuggestions(false);
    setSearchQuery("");
    setSuggestions([]);
    setIsFocused(false);

    if (mediaType === 'person') {
      router.push(`/person/${id}`);
    } else {
      const path = mediaType === 'tv' ? 'series' : mediaType;
      router.push(`/${path}/${id}`);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).getFullYear();
  };

  const getTitle = (item) => {
    return item.title || item.name;
  };

  const getReleaseDate = (item) => {
    return item.release_date || item.first_air_date;
  };

  const getMediaType = (item) => {
    return item.media_type || (item.title ? 'movie' : 'tv');
  };

  const isPerson = (item) => getMediaType(item) === 'person';

  return (
    <div className="w-full" ref={suggestionsRef}>
      <form onSubmit={handleSubmit} className="w-full mx-auto">
        <div className={`
          relative group
          ${isFocused ? 'transform scale-[1.02]' : 'transform scale-100'}
          transition-all duration-300 ease-out
        `}>
          {/* Container principal avec glassmorphism */}
          <div className={`
            relative flex items-center
            rounded-2xl overflow-hidden
            backdrop-blur-xl
            border-2 transition-all duration-300
            shadow-2xl
            ${isFocused 
              ? 'border-white/60 shadow-[0_8px_32px_rgba(255,255,255,0.25)]' 
              : 'border-white/30 shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
            }
            ${variant === 'light' 
              ? 'bg-white/95 text-gray-900' 
              : 'bg-white/20 text-white'
            }
          `}>
            
            {/* Icône de recherche */}
            <div className="flex items-center justify-center w-12 sm:w-14 h-12 sm:h-14">
              <Search 
                className={`
                  w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300
                  ${loading ? 'animate-pulse' : ''}
                  ${isFocused 
                    ? (variant === 'light' ? 'text-blue-600' : 'text-gray-800') 
                    : (variant === 'light' ? 'text-black' : 'text-gray-700')
                  }
                `} 
              />
            </div>

            {/* Input de recherche */}
            <input
              type="text"
              placeholder={t.search.homePlaceholder}
              className={`
                flex-1 h-12 sm:h-14
                px-2 sm:px-4
                text-sm sm:text-base
                font-medium
                bg-transparent
                outline-none
                transition-all duration-300
                ${variant === 'light' 
                  ? 'text-black placeholder-black' 
                  : 'text-gray-800 placeholder-gray-600'
                }
                ${isFocused ? 'placeholder-opacity-100' : 'placeholder-opacity-90'}
              `}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                if (suggestions.length > 0) setShowSuggestions(true);
              }}
              onBlur={() => setIsFocused(false)}
              aria-label="Rechercher des films et séries"
              autoComplete="off"
            />

            {/* Bouton de recherche */}
            <button
              type="submit"
              disabled={!searchQuery.trim()}
              className={`
                group/btn flex items-center justify-center
                h-12 sm:h-14 px-4 sm:px-6
                font-semibold text-sm sm:text-base
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variant === 'light'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                  : 'bg-gradient-to-r from-white/30 to-white/40 hover:from-white/40 hover:to-white/50 text-white border-l border-white/30'
                }
                ${searchQuery.trim() 
                  ? 'transform hover:scale-105 active:scale-95' 
                  : 'transform scale-100'
                }
              `}
            >
              <ArrowRight 
                className={`
                  w-4 h-4 transition-transform duration-300
                  ${searchQuery.trim() ? 'group-hover/btn:translate-x-1' : ''}
                `} 
              />
            </button>
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 z-[100]">
              <div className={`
                backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden
                ${variant === 'light' 
                  ? 'bg-white/95' 
                  : 'bg-gray-900/95'
                }
              `}>
                <div className="max-h-96 overflow-y-auto">
                  {suggestions.map((item) => (
                    <button
                      key={`${getMediaType(item)}-${item.id}`}
                      onClick={() => handleSuggestionClick(item)}
                      className={`
                        w-full flex items-center gap-4 p-4 text-left
                        transition-all duration-200
                        ${variant === 'light'
                          ? 'hover:bg-blue-50 text-gray-900'
                          : 'hover:bg-white/10 text-white'
                        }
                        border-b border-white/10 last:border-b-0
                      `}
                    >
                      {/* Miniature: poster ou photo */}
                      <div className={`flex-shrink-0 overflow-hidden rounded-lg bg-gray-700 ${isPerson(item) ? 'w-12 h-12' : 'w-12 h-16'}`}>
                        {isPerson(item) ? (
                          item.profile_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${item.profile_path}`}
                              alt={getTitle(item)}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="w-6 h-6 text-gray-400" />
                            </div>
                          )
                        ) : item.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                            alt={getTitle(item)}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            {getMediaType(item) === 'movie' ? (
                              <Film className="w-6 h-6 text-gray-400" />
                            ) : (
                              <Tv className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                        )}
                      </div>

                      {/* Informations */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-sm truncate">
                            {getTitle(item)}
                          </h3>
                          <span className={`
                            text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0
                            ${isPerson(item)
                              ? 'bg-amber-500/20 text-amber-400'
                              : getMediaType(item) === 'movie'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-purple-500/20 text-purple-400'
                            }
                          `}>
                            {isPerson(item) ? t.search.person : getMediaType(item) === 'movie' ? t.search.film : t.search.seriesLabel}
                          </span>
                        </div>
                        {isPerson(item) ? (
                          item.known_for_department && (
                            <p className="text-xs opacity-70 truncate">{item.known_for_department}</p>
                          )
                        ) : (
                          <div className="flex items-center gap-3 text-xs opacity-70">
                            {getReleaseDate(item) && (
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(getReleaseDate(item))}</span>
                              </div>
                            )}
                            {item.vote_average > 0 && (
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400" />
                                <span>{Math.round(item.vote_average * 10) / 10}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Footer des suggestions */}
                <div className={`
                  p-3 text-center text-xs opacity-70 border-t border-white/10
                  ${variant === 'light' ? 'text-gray-600' : 'text-white'}
                `}>
                  Appuyez sur Entrée pour voir tous les résultats
                </div>
              </div>
            </div>
          )}

          {/* Effet de glow au focus */}
          {isFocused && (
            <div className={`
              absolute inset-0 rounded-2xl
              ${variant === 'light' 
                ? 'bg-gradient-to-r from-blue-400/20 to-purple-400/20' 
                : 'bg-gradient-to-r from-white/20 to-blue-400/30'
              }
              blur-xl -z-10
              animate-pulse
            `} />
          )}
        </div>
      </form>
    </div>
  );
}
