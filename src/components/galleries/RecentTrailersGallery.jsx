"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { getRecentMovieTrailers, getRecentSeriesTrailers, getMovieVideos, getSeriesVideos } from '../../services/api';
import { tmdbRequest } from '../../services/api/base';
import { useLanguage } from '../../contexts/LanguageContext';
import SimpleBar from 'simplebar-react';

// Carte trailer avec miniature YouTube + ouverture modal interne
function TrailerCard({ item, onOpen }) {
  const thumb = `https://img.youtube.com/vi/${item.video_key}/hqdefault.jpg`;
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="flex flex-col gap-2 w-[340px] md:w-[380px] flex-none group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <div className="relative rounded-xl overflow-hidden w-full aspect-video bg-black shadow hover:shadow-lg transition-shadow">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
          loading="lazy"
          onError={(e) => {
            if (item.poster_path) {
              e.currentTarget.src = `https://image.tmdb.org/t/p/w342${item.poster_path}`;
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 text-white text-xs font-semibold bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
          ▶ {item.video_type || 'Trailer'}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-snug line-clamp-2 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">{item.title}</span>
        <span className="text-xs text-gray-300">{item.release_date || item.first_air_date}</span>
      </div>
    </button>
  );
}

const FILTERS = [
  { key: 'popular', color: 'blue' },
  { key: 'streaming', color: 'emerald' },
  { key: 'ontv', color: 'violet' },
  { key: 'forrent', color: 'amber' },
  { key: 'intheaters', color: 'rose' },
];

// Simple wrapper utilisant SimpleBar pour un scroll fluide sans boutons
function SimpleBarCarousel({ trailers, onOpen }) {
  return (
    <div className="w-full sm:max-w-[1200px] m-auto px-4 sm:px-8">
      <SimpleBar autoHide={false} className="w-full pb-4">
        <div className="flex gap-6 pr-6">
          {trailers.map(tr => (
            <TrailerCard key={tr.kind + '-' + tr.id + '-' + tr.video_key} item={tr} onOpen={onOpen} />
          ))}
          {trailers.length === 0 && (
            <div className="text-sm text-gray-400">Aucun trailer récent trouvé.</div>
          )}
        </div>
      </SimpleBar>
    </div>
  );
}

export default function RecentTrailersGallery({ include = 'both' }) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [active, setActive] = useState(null); // trailer actif pour modal
  const iframeRef = useRef(null);
  const [filter, setFilter] = useState('popular');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const wantMovies = include === 'movies' || include === 'both';
      const wantSeries = include === 'series' || include === 'both';

      // Helper pour récupérer liste brute selon filtre
      async function fetchMovieCandidates() {
        switch (filter) {
          case 'popular':
            return (await tmdbRequest('/discover/movie', { sort_by: 'popularity.desc', page: 1 })).results || [];
          case 'intheaters':
            return (await tmdbRequest('/movie/now_playing', { page: 1 })).results || [];
          case 'streaming':
            return (await tmdbRequest('/discover/movie', { sort_by: 'popularity.desc', with_watch_monetization_types: 'flatrate', watch_region: 'FR', page: 1 })).results || [];
          case 'forrent':
            return (await tmdbRequest('/discover/movie', { sort_by: 'popularity.desc', with_watch_monetization_types: 'rent', watch_region: 'FR', page: 1 })).results || [];
          case 'ontv': // pas de sens pour films, retour vide
            return [];
          default:
            return [];
        }
      }
      async function fetchSeriesCandidates() {
        switch (filter) {
          case 'popular':
            return (await tmdbRequest('/discover/tv', { sort_by: 'popularity.desc', page: 1 })).results || [];
          case 'ontv':
            return (await tmdbRequest('/tv/on_the_air', { page: 1 })).results || [];
          case 'streaming':
            return (await tmdbRequest('/discover/tv', { sort_by: 'popularity.desc', with_watch_monetization_types: 'flatrate', watch_region: 'FR', page: 1 })).results || [];
          // Heuristiques approximatives pour mapping louable / salles inexistants côté TV
          case 'forrent':
            return [];
          case 'intheaters':
            return [];
          default:
            return [];
        }
      }

      let movieCandidates = wantMovies ? await fetchMovieCandidates() : [];
      let seriesCandidates = wantSeries ? await fetchSeriesCandidates() : [];

      // Limiter pour réduire requêtes vidéos
  movieCandidates = movieCandidates.slice(0, 18);
  seriesCandidates = seriesCandidates.slice(0, 18);

      const trailers = [];

      // Fetch vidéos en parallèle contrôlé
      async function processCandidates(candidates, kind) {
        for (const media of candidates) {
          if (trailers.length >= 30) break; // limite globale
          try {
            const vids = kind === 'movie' ? await getMovieVideos(media.id) : await getSeriesVideos(media.id);
            const official = vids.find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
            if (official) {
              trailers.push({
                id: media.id,
                kind,
                title: media.title || media.name || media.original_title || media.original_name,
                release_date: media.release_date,
                first_air_date: media.first_air_date,
                poster_path: media.poster_path,
                popularity: media.popularity,
                video_key: official.key,
                video_name: official.name,
                video_type: official.type,
              });
            }
          } catch {/* ignore */}
        }
      }

      // Traiter films puis séries (ordre dépend du filtre pour cohérence UX)
      if (filter === 'ontv') {
        await processCandidates(seriesCandidates, 'series');
        await processCandidates(movieCandidates, 'movie');
      } else if (filter === 'forrent' || filter === 'intheaters') {
        await processCandidates(movieCandidates, 'movie');
        await processCandidates(seriesCandidates, 'series');
      } else if (filter === 'streaming') {
        await processCandidates(seriesCandidates, 'series');
        await processCandidates(movieCandidates, 'movie');
      } else { // popular
        await processCandidates(movieCandidates, 'movie');
        await processCandidates(seriesCandidates, 'series');
      }

      // Tri final selon filtre
      if (filter === 'popular') {
        trailers.sort((a,b) => (b.popularity||0) - (a.popularity||0));
      } else if (filter === 'intheaters') {
        trailers.sort((a,b) => ( (b.release_date||'') > (a.release_date||'') ? 1 : -1));
      } else if (filter === 'ontv') {
        trailers.sort((a,b) => ( (b.first_air_date||'') > (a.first_air_date||'') ? 1 : -1));
      } else {
        // fallback tri par date dispo
        trailers.sort((a,b) => ((b.release_date||b.first_air_date||'') > (a.release_date||a.first_air_date||'') ? 1 : -1));
      }

  const results = trailers.slice(0, 10);

      setTrailers(results);
    } catch (e) {
      console.error(e);
      setError('Impossible de charger les trailers');
    } finally {
      setLoading(false);
    }
  }, [include, filter]);

  useEffect(() => { load(); }, [load, filter]);

  // Fermer avec ESC
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setActive(null); };
    if (active) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active]);

  // Empêcher scroll arrière-plan quand modal ouverte
  useEffect(() => {
    if (active) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [active]);

  return (
    <section className="w-full m-auto flex flex-col gap-4 text-white pt-8 bg-gray-900">
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div className="w-full sm:max-w-[1200px] m-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            {t?.sections?.recentTrailers || 'Nouveaux Trailers'}
          </h2>
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map(f => {
              const isActive = f.key === filter;
              const label = t?.trailersFilters?.[f.key] || f.key;
              const colorMap = {
                blue: 'bg-blue-600 border-blue-500',
                emerald: 'bg-emerald-600 border-emerald-500',
                violet: 'bg-violet-600 border-violet-500',
                amber: 'bg-amber-500 border-amber-400',
                rose: 'bg-rose-600 border-rose-500'
              };
              const activeClasses = colorMap[f.color] || 'bg-blue-600 border-blue-500';
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  aria-pressed={isActive}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-white/30 ${isActive ? activeClasses + ' text-white shadow-md' : 'border-white/20 text-gray-300 hover:border-white/40 hover:text-white'} hover:shadow`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {loading && (
        <div className="w-full sm:max-w-[1200px] m-auto px-4 sm:px-8 pb-4">
          <div className="relative overflow-hidden">
            <div className="flex gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex-1 aspect-video bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      )}
      {error && <div className="text-sm text-red-500">{error}</div>}
      {!loading && !error && (
        <SimpleBarCarousel trailers={trailers} onOpen={setActive} />
      )}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
            onClick={() => setActive(null)}
          />
          <div className="relative w-full max-w-6xl aspect-video bg-black rounded-lg shadow-lg overflow-hidden animate-scaleIn">
            <button
              onClick={() => setActive(null)}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white text-xs px-2 py-1 rounded"
              aria-label="Fermer"
            >✕</button>
            <iframe
              ref={iframeRef}
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${active.video_key}?autoplay=1&rel=0`}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}