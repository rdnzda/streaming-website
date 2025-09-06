"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * Barre de recherche avec debouncing
 * Permet de rechercher des films et séries en temps réel
 */
export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const lastSentRef = useRef("");
  const { t } = useLanguage();

  // Appelle la recherche quand le texte est stable (debouncing)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmed = searchQuery.trim();
      if (trimmed === lastSentRef.current) return; // ne rien faire si identique
      lastSentRef.current = trimmed;
      onSearch(trimmed);
      setDebouncedQuery(trimmed);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, onSearch]);

  return (
    <div className="fixed top-[76px] flex flex-col items-center w-full bg-white z-50">
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-row w-full max-w-[1160px] px-4 sm:px-8 items-center">
        <Search className="w-5 h-5 text-black mr-2 flex-shrink-0" />
        <input
          type="text"
          placeholder={t.search.placeholder}
          className="search-input pt-3 pb-3 pl-3 sm:pl-5 outline-none italic text-black w-full text-sm sm:text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Rechercher des films et séries"
        />
      </form>
    </div>
  );
}
