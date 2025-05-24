"use client"

import { FaStar } from "react-icons/fa";

export default function LittleMovieCard( {movie} ) {

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
        <div className="movie-card flex flex-col items-center min-w-[150px] h-fit rounded overflow-hidden bg-white">
            <div className="movie-poster relative w-full overflow-hidden rounded-lg hover:shadow-[0_0_15px_4px_rgba(59,130,246,0.7)] transition-shadow duration-100 cursor-pointer">
                <img
                    alt={movie.title}
                    src={
                        movie.poster_path && movie.poster_path !== 'null'
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'https://placehold.co/200x300@2x.png'
                    }
                    className="object-cover border-b-black"
                />
            </div>
            <div className="movie-info flex pt-3 flex-col justify-center items-center text-center overflow-hidden w-full">
                <h3 className="text-[0.9rem] text-black text-left w-full font-bold">{movie.title}</h3>
                <p className="text-[0.9rem] text-left w-full text-black">{formatDateEnglish(movie.release_date)}</p>
            </div>
        </div>
    )
}