import { useNavigate } from 'react-router-dom';
import '../styles/MovieCard.css'; 
import notFoundPoster from "../assets/notFoundImages/Gemini_Generated_Image_lrvnz1lrvnz1lrvn.png"
import { useState } from 'react';

function MovieCard({ movie }: any) {
  const [imageLoadError, setImageLoadError] = useState(false)
  const navigate = useNavigate();

  // Função para quando clicar no container do filme, lhe direcionar para a pagina do memso.
  const handleClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  //handle para quando não conseguir carregar a imagem
  const handleImageError = () => {
    setImageLoadError(true);
  };

  //Determina a URL da imagem do pôster do filme a ser exibida. 
  const imageUrl = imageLoadError || movie.Poster === 'N/A'
    ? notFoundPoster 
    : movie.Poster; 


  return (
    <div className="movie-card" onClick={handleClick}>
      <img
        src={imageUrl} 
        alt={movie.Title}
        loading="lazy" 
        onError={handleImageError}
      />
      <div className="movie-card-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;