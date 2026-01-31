"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, User } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { searchPeople } from "../../services/api";
import { Footer, Loader, NavBar } from "../../components";

function PeoplePageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(!!initialQuery);
  const { t } = useLanguage();

  useEffect(() => {
    setQuery(initialQuery);
    if (initialQuery.trim()) {
      setLoading(true);
      searchPeople(initialQuery)
        .then((data) => {
          setResults(data || []);
        })
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      setLoading(true);
      searchPeople(q)
        .then((data) => setResults(data || []))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
      window.history.replaceState(null, "", `/people?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <NavBar />
      <main className="flex-1 pt-[76px] pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 mt-6">
            {t.navigation.distribution}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-2xl">
            {t.search.searchPeoplePlaceholder}
          </p>

          <form onSubmit={handleSubmit} className="mb-10">
            <div className="relative flex items-center rounded-xl overflow-hidden bg-gray-800 border border-gray-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30 transition-all max-w-xl">
              <div className="flex items-center justify-center w-12 h-12 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.search.searchPeoplePlaceholder}
                className="flex-1 h-12 px-3 bg-transparent text-white placeholder-gray-500 outline-none text-sm sm:text-base"
                aria-label={t.search.searchPeoplePlaceholder}
              />
              <button
                type="submit"
                disabled={!query.trim()}
                className="h-12 px-4 sm:px-6 font-medium bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm transition-colors"
              >
                {t.actions.search}
              </button>
            </div>
          </form>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader />
            </div>
          ) : results.length === 0 && query.trim() ? (
            <p className="text-gray-400 py-8">{t.search.noResults}</p>
          ) : results.length === 0 && !query.trim() ? (
            <p className="text-gray-500 text-sm py-8">
              {t.search.searchPeoplePlaceholder}
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
              {results.map((person) => (
                <Link
                  key={person.id}
                  href={`/person/${person.id}`}
                  className="group flex flex-col rounded-xl overflow-hidden bg-gray-800 shadow-lg hover:shadow-xl hover:ring-2 hover:ring-blue-500/60 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[2/3] overflow-hidden flex-shrink-0 relative">
                    {person.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-700">
                        <User className="w-16 h-16 text-gray-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80 pointer-events-none" />
                  </div>
                  <div className="p-3 bg-gradient-to-t from-gray-900 to-gray-800 flex-1 flex flex-col justify-end relative -mt-14 pt-12">
                    <h2 className="font-bold text-white text-sm line-clamp-2">
                      {person.name}
                    </h2>
                    {person.known_for_department && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {person.known_for_department}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function PeoplePage() {
  return (
    <Suspense fallback={<Loader />}>
      <PeoplePageContent />
    </Suspense>
  );
}
