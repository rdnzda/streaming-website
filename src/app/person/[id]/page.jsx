"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaFilm, FaTv } from "react-icons/fa";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getPersonDetails, getPersonCombinedCredits } from "../../../services/api";
import { Footer, Loader } from "../../../components";
import { NavBar } from "../../../components";

function getMediaUrl(mediaType, mediaId) {
  return mediaType === "tv" ? `/series/${mediaId}` : `/movie/${mediaId}`;
}

function getMediaTitle(item) {
  return item.title || item.name || "";
}

function getMediaDate(item) {
  return item.release_date || item.first_air_date || "";
}

export default function PersonPage() {
  const params = useParams();
  const router = useRouter();
  const { t, language } = useLanguage();
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = params;

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setLoading(true);
        setError(null);
        const [personData, creditsData] = await Promise.all([
          getPersonDetails(id, language),
          getPersonCombinedCredits(id),
        ]);
        setPerson(personData);
        setCredits(creditsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPerson();
  }, [id, language]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(
      language === "fr" ? "fr-FR" : language === "es" ? "es-ES" : "en-US",
      { year: "numeric" }
    );
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader />
      </div>
    );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t.errors.loadingError}</h1>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t.actions.goBack}
          </button>
        </div>
      </div>
    );
  }

  if (!person) return null;

  const profileUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
    : null;

  const castList = [...(credits?.cast || [])];
  const crewList = [...(credits?.crew || [])];
  const allCredits = [...castList, ...crewList]
    .filter((c) => (c.poster_path || c.backdrop_path) && (c.title || c.name))
    .sort((a, b) => {
      const dateA = getMediaDate(a) || "0000";
      const dateB = getMediaDate(b) || "0000";
      return dateB.localeCompare(dateA);
    });

  const seenIds = new Set();
  const uniqueCredits = allCredits.filter((c) => {
    const key = `${c.media_type}-${c.id}`;
    if (seenIds.has(key)) return false;
    seenIds.add(key);
    return true;
  });

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="relative pt-[76px] pb-8 min-h-screen bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-black/50 hover:bg-black/70 px-3 sm:px-4 py-2 rounded-lg transition-colors backdrop-blur-sm text-sm sm:text-base mb-6"
            aria-label={t.actions.goBack}
          >
            <FaArrowLeft className="text-sm" />
            <span className="hidden sm:inline">{t.actions.goBack}</span>
          </button>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-10">
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <div className="w-48 sm:w-56 md:w-64 aspect-[2/3] rounded-xl overflow-hidden bg-gray-800 shadow-2xl ring-2 ring-gray-700/50">
                {profileUrl ? (
                  <img
                    src={profileUrl}
                    alt=""
                    className="w-full h-full object-cover"
                    fetchPriority="high"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                    <span className="text-4xl font-light">?</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                {person.name}
              </h1>
              {person.known_for_department && (
                <p className="text-gray-400 text-sm sm:text-base mb-4">
                  {t.person.knownFor} : {person.known_for_department}
                </p>
              )}

              {person.biography && (
                <section className="mb-8">
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
                    {t.person.biography}
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base whitespace-pre-line line-clamp-[12] sm:line-clamp-none">
                    {person.biography}
                  </p>
                </section>
              )}

              {!person.biography && (
                <p className="text-gray-500 text-sm mb-8">{t.person.noBiography}</p>
              )}
            </div>
          </div>

          {uniqueCredits.length > 0 && (
            <section className="mt-12 sm:mt-16">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                {t.person.knownFor}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
                {uniqueCredits.slice(0, 24).map((item) => {
                  const mediaType = item.media_type;
                  const mediaId = item.id;
                  const href = getMediaUrl(mediaType, mediaId);
                  const posterPath = item.poster_path || item.backdrop_path;
                  const posterUrl = posterPath
                    ? `https://image.tmdb.org/t/p/w300${posterPath}`
                    : "https://placehold.co/300x450@2x.png";
                  const role = item.character || item.job;

                  return (
                    <Link
                      key={`${mediaType}-${mediaId}`}
                      href={href}
                      className="group block rounded-xl overflow-hidden bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="aspect-[2/3] overflow-hidden">
                        <img
                          src={posterUrl}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3 bg-gradient-to-t from-gray-900 to-gray-800">
                        <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                          {mediaType === "movie" ? (
                            <FaFilm className="text-xs flex-shrink-0" />
                          ) : (
                            <FaTv className="text-xs flex-shrink-0" />
                          )}
                          <span className="text-xs">
                            {mediaType === "movie" ? t.person.movies : t.person.series}
                          </span>
                        </div>
                        <h3 className="font-semibold text-white text-sm line-clamp-2 mb-0.5">
                          {getMediaTitle(item)}
                        </h3>
                        {role && (
                          <p className="text-xs text-gray-400 line-clamp-2">
                            {item.character ? t.person.asCharacter : t.person.asJob} {role}
                          </p>
                        )}
                        {getMediaDate(item) && (
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(getMediaDate(item))}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
