import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import HeaderLink from "./HeaderLink"; 
import SearchDropdownItem from "./SearchDropdownItem";
import type { MovieSearch } from "../common/interfaces/movie-search.interface";
import notFoundPoster from "../assets/notFoundImages/Gemini_Generated_Image_ocndxgocndxgocnd.png"
import logoWorkDoc from "../assets/Graffiti_Urban_Grunge_Brand_Logo-removebg-preview.png";
import "../styles/Header.css";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const[showDropdown,setShowDropdown] = useState(false)
    const [searchResults, setSearchResults] = useState<MovieSearch[]>([])

    const searchContainerRef = useRef<HTMLDivElement>(null);
    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    const navigate = useNavigate()
    
    useEffect(() => {
      // Função que será executada na rolagem da janela.
        const handleScroll = () => {
            // Verifica se a rolagem vertical da página (scrollY) ultrapassou 50 pixels.
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Adiciona um 'ouvinte' de evento para detectar a rolagem da janela.
        window.addEventListener('scroll', handleScroll);

        // Retorna uma função de limpeza que será executada quando o componente for desmontado.
        return () => {
            // Remove o 'ouvinte'
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
      // Se o termo de busca estiver vazio, limpa os resultados e esconde o dropdown.
      if (searchTerm.trim().length === 0) {
          setSearchResults([]);
          setShowDropdown(false);
          return;
      }

      // Se houver um timeout de debounce anterior em andamento, cancela-o.
      if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
      }

      // Define um novo timeout para realizar a busca após um pequeno atraso.
      debounceTimeout.current = setTimeout(() => {
          axios.get<MovieSearch[]>(`http://localhost:3000/api/movies/?search=`) 
              .then((response) => {
                  // Filtra localmente os resultados da resposta da API com base no termo de busca.
                  const filtered = response.data.filter(movie =>
                      movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                  setSearchResults(filtered);
                  setShowDropdown(true);
              })
              .catch(() => {
                  setSearchResults([]);
                  setShowDropdown(false);
              });
      }, 300); // O atraso de 300ms antes de executar a busca (debounce).

      // Retorna uma função de limpeza.
      return () => {
          if (debounceTimeout.current) {
              clearTimeout(debounceTimeout.current);
          }
      };
    },[searchTerm]);

  useEffect(() => {
    // Define a função que será executada quando ocorrer um clique em qualquer lugar.
    const handleClickOutside = (event: MouseEvent) => {
        // Verifica se o clique ocorreu fora da área do container de busca (searchContainerRef).
        if (
            searchContainerRef.current &&
            !searchContainerRef.current.contains(event.target as Node)
        ) {
            setShowDropdown(false);
        }
    };
    // Adiciona um 'ouvinte' de evento para detectar cliques do mouse em todo o documento.
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        // Remove o 'ouvinte' de evento para evitar vazamentos de memória.
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);

  //Gerencia o envio do formulário de busca e direciona para a pagina do filme
  const handleSearchSubmit = (e: React.FormEvent) => {
   e.preventDefault();
   if (searchTerm.trim()) {
   navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
   setSearchTerm('')
  }
    }

   //Função para fechar dropdown e navegar para a pagina de detalhes usando o imdbID 
   const handleClickMovie = (movie: MovieSearch) => { 
        setShowDropdown(false); 
        setSearchTerm(""); 
        navigate(`/movie/${movie.imdbID}`); 
    };

    return (
        <header>
            <div id="header-container" className={isScrolled ? 'scrolled' : ''}>
                <div id="header-logo">
                    <img src={logoWorkDoc} alt="logo_work_doc" onClick={() => navigate('/')} />
                </div>
               <div className="search-and-dropdown-container" ref={searchContainerRef}>
                        <form onSubmit={handleSearchSubmit} className="search-form">
                        <input
                            type="text"
                            placeholder="Buscar ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                            onFocus={() => {
                              if (searchResults.length > 0) setShowDropdown(true);
                            }}
                        autoComplete="off"
                        />
                         {showDropdown && searchResults.length > 0 && (
                       <ul className="search-dropdown">
                            {searchResults.map((movie) => (
                                <SearchDropdownItem
                                    key={movie.imdbID}
                                    movie={movie}
                                    onClick={handleClickMovie}
                                    notFoundPoster={notFoundPoster}
                                />
                            ))}
                        </ul>
                    )}
                        <button type="submit" className="search-button">Buscar</button>
                    </form>
                </div>
                <div id="header-links">
                    <HeaderLink name="Início" url="/"/> 
                    <HeaderLink name="Sobre nós" url="https://workdoc.com.br/sobre/"/>
                    <HeaderLink name="Site oficial" url="https://workdoc.com.br"/>
                </div>
            </div>
        </header>
    );
}