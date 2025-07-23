import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/MovieDetail.css'; 
import notFoundPoster from "../assets//notFoundImages/Gemini_Generated_Image_ocndxgocndxgocnd.png"
import type { MovieDetail } from '../common/interfaces/movie-detail.interface';

export default function MovieDetail() {
  const [movieDetails, setMovieDetails] = useState<MovieDetail | null>(null);
  const [ imageLoadError,setImageLoadError] = useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { imdbID } = useParams(); //Busca o imdbID passado no paramentro da url 

  const navigate = useNavigate();

  //useEffect para buscar os detalhes do filme.
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/movies/${imdbID}`); 
        if (response.status === 404) {
          throw new Error("Filme não encontrado ou detalhes indisponíveis.");
        }
        if (!response.ok) {
          throw new Error(`Erro ao carregar detalhes: ${response.statusText}`);
        }
        const data = await response.json();
        setMovieDetails(data);
      } catch (err: unknown) {
        console.error("Erro ao buscar detalhes do filme:", err);
      } finally {
        setLoading(false);
      }
    };

    if (imdbID) {
      fetchDetails();
    }
  }, [imdbID]); 

  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-screen">
          <p>Carregando detalhes do filme...</p>
        </div>
      </>
    );
  }

  //Bloco condicional para caso a busca o filme falhe.
  if (error) {
    return (
      <>
        <Header />
        <div className="error-screen">
          <p>{error}</p>
          <button onClick={() => navigate('/')}>Voltar à Lista</button>
        </div>
      </>
    );
  }

  //handle para quando não conseguir carregar a imagem
  const handleImageError = () => {
    setImageLoadError(true);
  };

  //Determina a URL da imagem do pôster do filme a ser exibida.
  const imageUrl = imageLoadError || movieDetails?.Poster === 'N/A'
    ? notFoundPoster 
    : movieDetails?.Poster; 

  //Bloco condicional para caso a busca aos detalhes falhe.
  if (!movieDetails) {
    return (
      <>
        <Header />
        <div className="error-screen">
          <p>Nenhum detalhe de filme encontrado.</p>
          <button onClick={() => navigate('/')}>Voltar à Lista</button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="movie-detail-container">
        <div className="movie-detail-header" style={{ backgroundImage: `url(${movieDetails.Poster})` }}>
          <div className="overlay">
            <div className="header-content">
              <h1>{movieDetails.Title}</h1>
              <p className="year-runtime">{movieDetails.Year} | {movieDetails.Runtime}</p>
              <p className="genre">{movieDetails.Genre}</p>
              <div className="ratings">
                {movieDetails.Ratings && movieDetails.Ratings.map((rating, index) => (
                  <span key={index} className="rating-item">
                    {rating.Source}: <strong>{rating.Value}</strong>
                  </span>
                ))}
                {movieDetails.imdbRating && <span className="rating-item">IMDb: <strong>{movieDetails.imdbRating}</strong></span>}
                {movieDetails.Metascore && <span className="rating-item">Metascore: <strong>{movieDetails.Metascore}</strong></span>}
              </div>
            </div>
          </div>
        </div>

        <div className="movie-detail-body">
          <div className="poster-plot">
            <img src={imageUrl} alt={movieDetails.Title} className="detail-poster" onError={handleImageError} />
            <div className="plot-info">
              <h3>Sinopse</h3>
              <p>{movieDetails.Plot}</p>
            </div>
          </div>

          <div className="additional-info">
            <p><strong>Diretor:</strong> {movieDetails.Director}</p>
            <p><strong>Escritor:</strong> {movieDetails.Writer}</p>
            <p><strong>Atores:</strong> {movieDetails.Actors}</p>
            <p><strong>Lançamento:</strong> {movieDetails.Released}</p>
            <p><strong>País:</strong> {movieDetails.Country}</p>
            <p><strong>Idioma:</strong> {movieDetails.Language}</p>
            <p><strong>Prêmios:</strong> {movieDetails.Awards}</p>
            <p><strong>Bilheteria:</strong> {movieDetails.BoxOffice}</p>
            <p><strong>Produção:</strong> {movieDetails.Production}</p>
          </div>
        </div>
      </div>
    </>
  );
}
