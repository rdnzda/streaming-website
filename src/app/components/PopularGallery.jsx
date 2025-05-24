import MovieCard from "./MovieCard";

export default function PopularGallery({ movies = [], pageLoading, loadingMore, error, onLoadMore, canLoadMore }) {
  if (pageLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-start gap-10 pb-10">
      <h2 className="drop-shadow-md font-bold text-2xl">Popular Movies</h2>
      <div className="movie-gallery grid grid-cols-5 gap-10 items-center justify-center">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>

      {canLoadMore && (
        <button
          className="px-7 py-2 cursor-pointer rounded bg-gray-900 hover:bg-gray-800 m-auto"
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