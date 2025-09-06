"use client";

import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { 
  formatNote, 
  formatDateEnglish,
  getTMDBImageUrl,
  getPlaceholderImage 
} from "../../services/utils/formatters.js";

/**
 * Composant de carte spécifique aux films
 * Version simplifiée de MediaCard pour les films uniquement
 */
export default function MovieCard({ movie }) {
  const router = useRouter();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    // TODO: Implémenter la logique des favoris
    alert("Favori cliqué");
  };

  const handleCardClick = () => {
    router.push(`/movie/${movie.id}`);
  };

  const posterUrl = getTMDBImageUrl(movie.poster_path, 'w500') || getPlaceholderImage(200, 300);

  return (
    <div 
      className="movie-card flex flex-col items-center w-[200px] h-[400px] rounded-md overflow-hidden bg-gray-800 cursor-pointer drop-shadow-md hover:shadow-[0_0_15px_4px_rgba(59,130,246,0.7)] transition-shadow duration-100"
      onClick={handleCardClick}
    >
      {/* Poster */}
      <div className="movie-poster relative w-[200px] min-h-[300px] overflow-hidden">
        <img
          alt={movie.title}
          src={posterUrl}
          className="object-cover border-b-black"
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
        <p className="text-gray-100 font-semibold h-fit">{formatNote(movie.vote_average)}</p>
        <FaStar className="text-yellow-500 mb-0.5" />
      </div>

      {/* Informations */}
      <div className="movie-info p-5 pt-7 pb-7 flex h-[100px] flex-col justify-center gap-0.5 items-center text-center overflow-hidden w-full">
        <h3 className="text-[0.91em] text-white text-left w-full font-bold">{movie.title}</h3>
        <p className="text-xs text-left w-full text-gray-400">{formatDateEnglish(movie.release_date)}</p>
      </div>
    </div>
  );
}
