import { useNavigate } from 'react-router-dom';
import '../styles/MovieCard.css'; 
import notFoundPoster from "../assets/notFoundImages/Gemini_Generated_Image_lrvnz1lrvnz1lrvn.png"
import { useState } from 'react';
import type { MovieSearch } from '../common/interfaces/movie-search.interface';

function MovieCard({ movie }: { movie: MovieSearch }) { 
  const [imageLoadError, setImageLoadError] = useState(false)
  const navigate = useNavigate();
  
  // Função para quando clicar no container do filme, lhe enviar para a pagina do mesmo.
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
  
  // Função para renderizar o ano de lançamento de um filme ou série.
  function renderYear(year: string | number | undefined): string {
    if (!year) return '';

    const yearStr = String(year);

    const normalizeYear = (y: string) => {
      return y
        .replace('â€“', '–') // corrige traço mal codificado
        .replace(/[^\d–-]/g, '') // remove tudo que não for número ou traço
        .replace(/[-–]/g, '–') // normaliza traços
        .trim();
    };

    const cleaned = normalizeYear(yearStr);
    const yearRegex = /^(\d{4})(?:–(\d{4}))?$/;       
    const ongoingRegex = /^(\d{4})–$/;              

    const fullMatch = cleaned.match(yearRegex);
    if (fullMatch) {
      const [_, start, end] = fullMatch;
      return end ? `${start}–${end}` : start;
    }

    const ongoingMatch = cleaned.match(ongoingRegex);
    if (ongoingMatch) {
      const start = ongoingMatch[1];
      return `${start} – Presente`;
    }

    return '';
  }
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
    <p>{renderYear(movie.Year)}</p>

</div>
    </div>
  );
}

export default MovieCard;