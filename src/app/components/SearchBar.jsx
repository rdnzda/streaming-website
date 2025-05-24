"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Appelle la recherche quand le texte est stable
    useEffect(() => {
    const timeoutId = setTimeout(() => {
        const trimmed = searchQuery.trim();

        // Appeler onSearch dans tous les cas
        onSearch(trimmed);

        setDebouncedQuery(trimmed);
    }, 50);

    return () => clearTimeout(timeoutId);
    }, [searchQuery]);

  return (
    <div className="fixed top-[76px] flex flex-col items-center w-full bg-white z-50">
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-row w-[1160px] items-center">
        <Search className="w-5 h-5 text-black mr-2" />
        <input
          type="text"
          placeholder="Rechercher des films..."
          className="search-input pt-3 pb-3 pl-5 outline-none italic text-black w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </div>
  )}