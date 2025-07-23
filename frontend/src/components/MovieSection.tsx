import MovieCard from './MovieCard';
import '../styles/MovieSection.css'; 

function MovieSection({ title, movies }: any) {
  if (!movies || movies.length === 0) {
    return null; 
  }

  return (
    <div className="movie-section">
      <h2>{title}</h2>
      <div className="movie-list">
        {movies.map((movie: any) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieSection;