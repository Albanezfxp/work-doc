import MovieCard from './MovieCard';
import '../styles/MovieSection.css'; 

// Função verifica se existe filme para a sessão. Caso não exista, o componente não é construido. 
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