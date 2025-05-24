"use client";

import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/api";
import LittleMovieCard from "./LittleMovieCard";
import SimpleBar from "simplebar-react";
import ToggleButton from "./ToggleButton";

export default function TrendingGallery() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [timeWindow, setTimeWindow] = useState("day"); // "day" ou "week"

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const movies = await getTrendingMovies(timeWindow);
        setTrendingMovies(movies);
      } catch (err) {
        setError("Failed to load trending movies");
      }
    };
    loadTrending();
  }, [timeWindow]);

  return (
    <div className="w-full m-auto pt-8 flex flex-col gap-6 bg-white text-black">
      <div className="w-[1160px] m-auto flex gap-5 items-center">
        <h3 className="font-semibold text-2xl tracking-tight">En tendance</h3>
        <ToggleButton selected={timeWindow} onSelect={setTimeWindow} />
      </div>

      {error && <p>{error}</p>}

      <div className="max-w-[1160px] m-auto flex content-center">
        <SimpleBar autoHide={false} className="w-full">
          <div className="flex gap-6">
            {trendingMovies.map((movie) => (
              <LittleMovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}
