"use client"

import { FaStar } from "react-icons/fa";

export default function MovieCard( {movie} ) {

    function onFavoriteClick() {
        alert("clicked")
    }

    function formatDateEnglish(dateString) {
        if (!dateString) return "";

        const mois = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const [year, month, day] = dateString.split("-");
        const monthName = mois[parseInt(month, 10) - 1];

        return `${monthName} ${day}, ${year}`;
    }

    function formatNote(note) {
        return Math.round(note * 10) / 10;
    }

    return (
        <div className="movie-card flex flex-col items-center w-[200px] h-[400px] rounded-md overflow-hidden bg-gray-800 cursor-pointer drop-shadow-md hover:shadow-[0_0_15px_4px_rgba(59,130,246,0.7)] transition-shadow duration-100">
            <div className="movie-poster relative w-[200px] min-h-[300px] overflow-hidden">
                <img
                    alt={movie.title}
                    src={
                        movie.poster_path && movie.poster_path !== 'null'
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'https://placehold.co/200x300@2x.png'
                    }
                    className="object-cover border-b-black"
                />
                <div className="movie-overlay">
                    <button className="favorite-btn" onClick={onFavoriteClick}></button>
                </div>
            </div>
            <div className="note absolute bottom-1 right-1.5 flex flex-row items-center justify-center gap-1 drop-shadow-md">
                <p className="text-gray-100 font-semibold h-fit">{formatNote(movie.vote_average)}​</p>
                <FaStar className="text-yellow-500 mb-0.5"/>
            </div>
            <div className="movie-info p-5 pt-7 pb-7 flex h-[100px] flex-col justify-center gap-0.5 items-center text-center overflow-hidden w-full">
                <h3 className="text-[0.91em] text-white text-left w-full font-bold">{movie.title}</h3>
                <p className="text-xs text-left w-full text-gray-400">{formatDateEnglish(movie.release_date)}</p>
            </div>
        </div>
    )
}