import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import MovieSection from "../components/MovieSection";
import Header from "../components/Header";
import type { MovieSearch } from "../common/interfaces/movie-search.interface";
import videoBanner from "../assets/Star Wars Vintage GIF.mp4"
import "../styles/Home.css"

export default function Home() {
const [allMovies, setAllMovies] = useState<MovieSearch[]>([]);
const [loading, setLoading] = useState(true);

const navigate = useNavigate()

//Busca os filmes na base da dados e armazena em um array.
useEffect(() => {
    const allMovies = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/movies");
            setAllMovies(response.data);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error)
        } finally {
            setLoading(false)
        }
    }
    allMovies()
}, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <p>Carregando filmes...</p>
      </div>
    );
  }

//Filtragem dos filmes para as seções
const startWarsMovies = allMovies.filter(movie => movie.Title.includes('Star Wars: Episode'))
const otherMovies = allMovies.filter(movie => !movie.Title.includes('Star Wars: Episode') && movie.Type === 'movie');
const seriesAndGames = allMovies.filter(item => item.Type === 'series' || item.Type === 'game');

return (<>
<Header/>
  <main>
        <div className="video-banner-container">
          <video src={videoBanner} autoPlay muted loop playsInline className="video-background"></video>
          <div className="banner-overlay">
            <div className="banner-content">
              <h1>Star Wars The Empire Strikes Back</h1>
              <p>Luke Skywalker, Han Solo, Princess Leia and Chewbacca face attack by the Imperial force.</p>
              <div className="banner-buttons">
                <button className="info-button" onClick={() => navigate('/movie/tt0080684')}>ⓘ Mais Informações</button>
              </div>
            </div>
          </div>
        </div>

        <div id="home-main-container">
          <MovieSection title="Filmes Clássicos de Star Wars" movies={startWarsMovies} />
          <MovieSection title="Outros Filmes" movies={otherMovies} />
          <MovieSection title="Séries e Jogos (Star Wars)" movies={seriesAndGames} />
        </div>
      </main>
</>)
}