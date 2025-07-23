import{ useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import axios from 'axios';
import Header from '../components/Header';
import MovieSection from '../components/MovieSection'; 
import type { MovieSearch } from '../common/interfaces/movie-search.interface';
import '../styles/SearchPage.css'; 

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || ''; 

  const [results, setResults] = useState<MovieSearch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect para buscar resultados de filmes sempre que o termo de busca (searchTerm) mudar
  useEffect(() => {
    const fetchSearchResults = async () => {
      // Se não houver termo de busca na URL, não faz requisição
      if (!searchTerm) { 
        setResults([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // Faz a requisição para sua API com o termo de busca
        const response = await axios.get<MovieSearch[]>(`http://localhost:3000/api/movies/?search=${encodeURIComponent(searchTerm)}`);
        setResults(response.data);
      } catch (err: unknown) {
        console.error("Erro ao buscar resultados:", err);
        if (axios.isAxiosError(err)) {
          if (err.response) {
            setError(`Erro ao buscar: ${err.response.status} - ${err.response.statusText || 'Erro desconhecido'}`);
          } else if (err.request) {
            setError("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
          } else {
            setError(`Erro inesperado na requisição: ${err.message}`);
          }
        } else if (err instanceof Error) {
          setError(`Ocorreu um erro: ${err.message}`);
        } else {
          setError("Ocorreu um erro desconhecido ao buscar resultados.");
        }
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm]); 

  return (
    <>
      <Header />
      <main className="search-results-main">
        <div className="search-results-container">
          {loading ? (
            <p className="loading-message">Buscando resultados para "{searchTerm}"...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : results.length > 0 ? (
            <>
              <h1>Resultados da Busca para "{searchTerm}"</h1>
              <MovieSection title="" movies={results} />
            </>
          ) : (
            <p className="no-results-message">Nenhum resultado encontrado para "{searchTerm}".</p>
          )}
        </div>
      </main>
    </>
  );
}