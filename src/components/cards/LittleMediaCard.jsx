"use client";

import { useRouter } from "next/navigation";
import { 
  formatDateEnglish, 
  getMediaTitle, 
  getMediaReleaseDate,
  getTMDBImageUrl,
  getPlaceholderImage 
} from "../../services/utils/formatters.js";

/**
 * Version compacte de la carte média
 * Pour les affichages en grille plus dense (trending, suggestions, etc.)
 */
export default function LittleMediaCard({ media, mediaType = "movie" }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/${mediaType}/${media.id}`);
  };

  const title = getMediaTitle(media, mediaType);
  const releaseDate = getMediaReleaseDate(media, mediaType);
  const posterUrl = getTMDBImageUrl(media.poster_path, 'w500') || getPlaceholderImage(200, 300, 'No Image');

  return (
    <div 
      className="movie-card pb-4 flex flex-col items-center min-w-[150px] h-fit rounded bg-white cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Poster */}
      <div className="movie-poster relative w-full overflow-hidden rounded-lg aspect-[2/3] hover:shadow-[0_0_15px_4px_rgba(59,130,246,0.7)] transition-shadow duration-150 cursor-pointer">
        <img
          alt={title}
          src={posterUrl}
          className="absolute inset-0 w-full h-full object-cover select-none"
          loading="lazy"
        />
        {/* Overlay gradient pour l'effet hover */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.45),rgba(0,0,0,0)_55%)] opacity-0 hover:opacity-100 transition-opacity" />
      </div>

      {/* Informations */}
      <div className="movie-info flex pt-3 flex-col justify-center items-center text-center overflow-hidden w-full px-0.5">
        <h3 className="text-[0.9rem] text-black text-left w-full font-bold line-clamp-2 leading-snug">
          {title}
        </h3>
        <p className="text-[0.7rem] text-left w-full text-gray-600">
          {formatDateEnglish(releaseDate)}
        </p>
      </div>
    </div>
  );
}
