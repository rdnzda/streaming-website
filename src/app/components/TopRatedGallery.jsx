import MovieCard from "./MovieCard";
import SimpleBar from "simplebar-react";

export default function TopRatedGallery({ movies = [], pageLoading, loadingMore, error, onLoadMore, canLoadMore }) {
  if (pageLoading) {
    return (
      <div className="flex flex-col items-center gap-10">Loading...</div>
    );
  }

  return (
      <div className="flex flex-col items-start gap-10 pb-10">
      <h2 className="drop-shadow-md font-bold text-2xl">Top Rated Movies</h2>
        <div className="movie-gallery grid grid-cols-5 gap-10 items-center justify-center">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
  
        {canLoadMore && (
          <button
            className="px-7 py-2 cursor-pointer rounded bg-gray-800 hover:bg-zinc-800 m-auto"
            onClick={onLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "More"}
          </button>
        )}
  
        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }
