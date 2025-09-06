"use client";

import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { 
  formatNote, 
  formatDateEnglish, 
  getMediaTitle, 
  getMediaReleaseDate,
  getTMDBImageUrl,
  getPlaceholderImage 
} from "../../services/utils/formatters.js";

/**
 * Composant de carte média principal
 * Affiche une carte de film ou série avec poster, note, titre et date
 */
export default function MediaCard({ media, mediaType = "movie" }) {
  const router = useRouter();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    // TODO: Implémenter la logique des favoris
    alert("Favori cliqué");
  };

  const handleCardClick = () => {
    router.push(`/${mediaType}/${media.id}`);
  };

  const title = getMediaTitle(media, mediaType);
  const releaseDate = getMediaReleaseDate(media, mediaType);
  const posterUrl = getTMDBImageUrl(media.poster_path, 'w500') || getPlaceholderImage(200, 300);

  return (
    <div 
      className="movie-card flex flex-col items-center w-full max-w-[200px] sm:w-[200px] h-[350px] sm:h-[400px] rounded-md overflow-hidden bg-gray-800 cursor-pointer drop-shadow-md hover:shadow-[0_0_15px_4px_rgba(59,130,246,0.7)] transition-shadow duration-100 mx-auto"
      onClick={handleCardClick}
    >
      {/* Poster */}
      <div className="movie-poster relative w-full min-h-[250px] sm:min-h-[300px] overflow-hidden">
        <img
          alt={title}
          src={posterUrl}
          className="object-cover border-b-black w-full h-full"
        />
        <div className="movie-overlay">
          <button 
            className="favorite-btn" 
            onClick={handleFavoriteClick}
            aria-label="Ajouter aux favoris"
          />
        </div>
      </div>

      {/* Note */}
      <div className="note absolute bottom-1 right-1.5 flex flex-row items-center justify-center gap-1 drop-shadow-md">
        <p className="text-gray-100 font-semibold h-fit text-sm sm:text-base">{formatNote(media.vote_average)}</p>
        <FaStar className="text-yellow-500 mb-0.5 text-sm sm:text-base" />
      </div>

      {/* Informations */}
      <div className="movie-info p-3 sm:p-5 pt-4 sm:pt-7 pb-4 sm:pb-7 flex h-[100px] flex-col justify-center gap-0.5 items-center text-center overflow-hidden w-full">
        <h3 className="text-sm sm:text-[0.91em] text-white text-left w-full font-bold line-clamp-2">{title}</h3>
        <p className="text-xs text-left w-full text-gray-400">{formatDateEnglish(releaseDate)}</p>
      </div>
    </div>
  );
}
