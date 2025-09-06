"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaStar, FaArrowLeft, FaCalendarAlt, FaClock, FaGlobe, FaPlay, FaTimes, FaUser } from "react-icons/fa";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getMovieDetails, getSeriesDetails, getMovieCredits, getSeriesCredits, getMovieVideos, getSeriesVideos, getMovieReviews, getSeriesReviews } from "../../../services/api";
import { Footer, Loader } from "../../../components";
import { NavBar } from "../../../components";

export default function MediaDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { t, language } = useLanguage();
  const [media, setMedia] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState(new Set());
  const [reviewsToShow, setReviewsToShow] = useState(5);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all', 'positive', 'negative'
  const [reviewSort, setReviewSort] = useState('newest'); // 'newest', 'oldest', 'rating_high', 'rating_low'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { type, id } = params;
  const isMovie = type === "movie";

  useEffect(() => {
    const fetchMediaDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Récupérer les détails du media
        const mediaData = isMovie 
          ? await getMovieDetails(id, language)
          : await getSeriesDetails(id, language);

        // Récupérer les crédits (casting)
        const creditsData = isMovie 
          ? await getMovieCredits(id)
          : await getSeriesCredits(id);

        // Récupérer les vidéos/trailers
        const videosData = isMovie 
          ? await getMovieVideos(id)
          : await getSeriesVideos(id);

        // Récupérer les avis
        const reviewsData = isMovie 
          ? await getMovieReviews(id)
          : await getSeriesReviews(id);

        setMedia(mediaData);
        setCredits(creditsData);
        setVideos(videosData); // videosData est déjà un array selon votre API
        setReviews(reviewsData);
        setAllReviews(reviewsData || []);
        setFilteredReviews(reviewsData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id && type) {
      fetchMediaDetails();
    }
  }, [id, type, language, isMovie]);

  // Fermer le modal avec Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowTrailer(false);
      }
    };

    if (showTrailer) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [showTrailer]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const formatNote = (note) => {
    return Math.round(note * 10) / 10;
  };

  const toggleReviewExpansion = (reviewId) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  const renderStars = (rating) => {
    const stars = [];
    const normalizedRating = rating / 2; // TMDB utilise /10, nous voulons /5
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={`${i <= normalizedRating ? 'text-yellow-400' : 'text-gray-400'} text-sm`} 
        />
      );
    }
    return stars;
  };

  // Fonction pour filtrer et trier les avis
  const filterAndSortReviews = (reviewsData, filter, sort) => {
    let filtered = [...reviewsData];

    // Filtrage par note
    if (filter === 'positive') {
      filtered = filtered.filter(review => 
        review.author_details?.rating && review.author_details.rating >= 6
      );
    } else if (filter === 'negative') {
      filtered = filtered.filter(review => 
        review.author_details?.rating && review.author_details.rating < 6
      );
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sort) {
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'rating_high':
          const ratingA = a.author_details?.rating || 0;
          const ratingB = b.author_details?.rating || 0;
          return ratingB - ratingA;
        case 'rating_low':
          const ratingA2 = a.author_details?.rating || 0;
          const ratingB2 = b.author_details?.rating || 0;
          return ratingA2 - ratingB2;
        case 'newest':
        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });

    return filtered;
  };

  // Effet pour filtrer et trier les avis quand les filtres changent
  useEffect(() => {
    if (allReviews.length > 0) {
      const filtered = filterAndSortReviews(allReviews, reviewFilter, reviewSort);
      setFilteredReviews(filtered);
    }
  }, [allReviews, reviewFilter, reviewSort]);

  if (loading) return (
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

  if (!media) return null;

  const title = isMovie ? media.title : media.name;
  const releaseDate = isMovie ? media.release_date : media.first_air_date;
  const backdrop = media.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${media.backdrop_path}`
    : null;

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="relative pt-[76px] pb-8 h-full bg-gray-900 text-white">
        {/* Image de fond */}
        {backdrop && (
          <div className="relative h-[30vh] sm:h-[40vh] overflow-hidden">
            <img
              src={backdrop}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
            
            {/* Bouton retour positionné sur l'image */}
            <div className="absolute top-4 left-4 z-20">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 bg-black/50 hover:bg-black/70 px-3 sm:px-4 py-2 rounded-lg transition-colors backdrop-blur-sm text-sm sm:text-base"
              >
                <FaArrowLeft className="text-sm" />
                <span className="hidden sm:inline">{t.actions.goBack}</span>
              </button>
            </div>
          </div>
        )}

        {/* Si pas d'image de fond, bouton en haut de page */}
        {!backdrop && (
          <div className="px-4 sm:px-6 pt-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 bg-black/50 hover:bg-black/70 px-3 sm:px-4 py-2 rounded-lg transition-colors backdrop-blur-sm text-sm sm:text-base"
            >
              <FaArrowLeft className="text-sm" />
              <span className="hidden sm:inline">{t.actions.goBack}</span>
            </button>
          </div>
        )}

        {/* Contenu principal */}
        <div className="relative -mt-16 sm:-mt-20 z-10 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
              {/* Poster */}
              <div className="flex-shrink-0 flex justify-center lg:justify-start">
                <img
                  src={
                    media.poster_path
                      ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
                      : 'https://placehold.co/300x450@2x.png'
                  }
                  alt={title}
                  className="w-48 sm:w-60 lg:w-72 h-auto rounded-lg shadow-2xl"
                />
              </div>

              {/* Informations */}
              <div className="flex-1 space-y-4 sm:space-y-6 text-center lg:text-left">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2">{title}</h1>
                  {media.tagline && (
                    <p className="text-base sm:text-lg lg:text-xl text-gray-300 italic">{media.tagline}</p>
                  )}
                </div>

                {/* Note et informations rapides */}
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 sm:gap-6 text-sm sm:text-base lg:text-lg">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    <span className="font-semibold">{formatNote(media.vote_average)}</span>
                    <span className="text-gray-400 hidden sm:inline">({media.vote_count} {t.details.votes})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-400" />
                    <span className="text-sm sm:text-base">{formatDate(releaseDate)}</span>
                  </div>

                  {isMovie && media.runtime && (
                    <div className="flex items-center gap-2">
                      <FaClock className="text-green-400" />
                      <span className="text-sm sm:text-base">{formatRuntime(media.runtime)}</span>
                    </div>
                  )}

                  {!isMovie && media.number_of_seasons && (
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 font-semibold text-sm sm:text-base">
                        {media.number_of_seasons} {t.details.seasons}
                      </span>
                    </div>
                  )}
                </div>

                {/* Genres */}
                {media.genres && media.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {media.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Synopsis */}
                {media.overview && (
                  <div>
                    <h2 className="text-2xl font-bold mb-3">{t.details.synopsis}</h2>
                    <p className="text-gray-300 leading-relaxed text-lg">{media.overview}</p>
                  </div>
                )}

                {/* Bouton Trailer moderne et simple */}
                {videos && videos.length > 0 && (
                  <div>
                    <button
                      onClick={() => setShowTrailer(true)}
                      className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <FaPlay className="text-sm" />
                      <span>Regarder le Trailer</span>
                    </button>
                  </div>
                )}

                {/* Pays de production */}
                {media.production_countries && media.production_countries.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <FaGlobe className="text-blue-400" />
                      {t.details.countries}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {media.production_countries.map((country) => (
                        <span
                          key={country.iso_3166_1}
                          className="bg-blue-900/50 px-3 py-1 rounded text-sm"
                        >
                          {country.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Distribution modernisée */}
            {credits && credits.cast && credits.cast.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-white mb-8">
                  {t.details.cast}
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {credits.cast.slice(0, 12).map((actor) => (
                    <div key={actor.id} className="group">
                      <div className="relative overflow-hidden rounded-xl bg-gray-800 shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 h-full flex flex-col">
                        <div className="aspect-[3/4] overflow-hidden flex-shrink-0">
                          <img
                            src={
                              actor.profile_path
                                ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                                : 'https://placehold.co/300x400@2x.png'
                            }
                            alt={actor.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        
                        <div className="p-4 bg-gradient-to-t from-gray-900 to-gray-800 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-white text-sm mb-1 line-clamp-2">
                              {actor.name}
                            </h3>
                            <p className="text-xs text-gray-400 line-clamp-2">
                              {actor.character}
                            </p>
                          </div>
                        </div>
                        
                        {/* Overlay hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section Avis */}
            {allReviews && allReviews.length > 0 && (
              <div className="mt-16">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                  <h2 className="text-3xl font-bold text-white">
                    {t.details.reviews}
                  </h2>
                  
                  {/* Filtres et statistiques */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="text-sm text-gray-400">
                      {t.reviewsSystem.stats.showing} {Math.min(reviewsToShow, filteredReviews.length)} {t.reviewsSystem.stats.of} {filteredReviews.length} ({allReviews.length} {t.reviewsSystem.stats.total})
                    </div>
                  </div>
                </div>

                {/* Contrôles de filtrage */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 mb-6 border border-gray-700/50">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Filtre par type */}
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t.reviewsSystem.filterBy}
                      </label>
                      <select
                        value={reviewFilter}
                        onChange={(e) => setReviewFilter(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">{t.reviewsSystem.filters.all}</option>
                        <option value="positive">{t.reviewsSystem.filters.positive}</option>
                        <option value="negative">{t.reviewsSystem.filters.negative}</option>
                      </select>
                    </div>

                    {/* Tri */}
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t.reviewsSystem.sortBy}
                      </label>
                      <select
                        value={reviewSort}
                        onChange={(e) => setReviewSort(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="newest">{t.reviewsSystem.sorts.newest}</option>
                        <option value="oldest">{t.reviewsSystem.sorts.oldest}</option>
                        <option value="rating_high">{t.reviewsSystem.sorts.rating_high}</option>
                        <option value="rating_low">{t.reviewsSystem.sorts.rating_low}</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {filteredReviews.slice(0, reviewsToShow).map((review) => (
                    <div key={review.id} className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                            {review.author_details?.avatar_path && !review.author_details.avatar_path.includes('gravatar') ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`}
                                alt={review.author}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <FaUser className="text-white text-lg" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{review.author}</h3>
                            <div className="flex items-center gap-2">
                              {review.author_details?.rating && (
                                <div className="flex items-center gap-1">
                                  {renderStars(review.author_details.rating)}
                                  <span className="text-sm text-gray-400 ml-1">
                                    ({review.author_details.rating}/10)
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">
                          {formatDate(review.created_at)}
                        </div>
                      </div>
                      
                      <div className="text-gray-300">
                        {review.content.length > 300 ? (
                          <div>
                            <p className="leading-relaxed">
                              {expandedReviews.has(review.id) 
                                ? review.content 
                                : `${review.content.substring(0, 300)}...`
                              }
                            </p>
                            <button
                              onClick={() => toggleReviewExpansion(review.id)}
                              className="text-blue-400 hover:text-blue-300 text-sm mt-2 font-medium transition-colors"
                            >
                              {expandedReviews.has(review.id) ? t.details.readLess : t.details.readMore}
                            </button>
                          </div>
                        ) : (
                          <p className="leading-relaxed">{review.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Boutons de pagination */}
                {filteredReviews.length > reviewsToShow && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setReviewsToShow(prev => prev + 5)}
                      className="bg-white hover:bg-white/90 text-black px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      {t.reviewsSystem.showMore}
                    </button>
                  </div>
                )}

                {reviewsToShow > 5 && (
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setReviewsToShow(5)}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {t.reviewsSystem.showLess}
                    </button>
                  </div>
                )}

                {filteredReviews.length === 0 && allReviews.length > 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-400">Aucun avis trouvé avec les filtres sélectionnés</p>
                  </div>
                )}
              </div>
            )}

            {allReviews && allReviews.length === 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-white mb-8">
                  {t.details.reviews}
                </h2>
                <div className="text-center py-8">
                  <p className="text-gray-400">{t.details.noReviews}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Trailer */}
        {showTrailer && videos && videos.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl mx-4">
              <button
                onClick={() => setShowTrailer(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <FaTimes className="text-2xl" />
              </button>
              
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${videos[0].key}?autoplay=1`}
                  title="Trailer"
                  className="absolute inset-0 w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
