import { useState } from "react";
import type { MovieSearch } from "../common/interfaces/movie-search.interface";

interface SearchDropdownItemProps {
    movie: MovieSearch;
    onClick: (movie: MovieSearch) => void;
    notFoundPoster: string;
}

const SearchDropdownItem: React.FC<SearchDropdownItemProps> = ({ movie, onClick, notFoundPoster }) => {
    // Cada item do dropdown tem seu próprio estado
    const [itemImageLoadError, setItemImageLoadError] = useState(false);

    const handleItemImageError = () => {
        setItemImageLoadError(true);
    };

    // A URL da imagem é determinada individualmente para cada item
    const imageUrl = itemImageLoadError || movie.Poster === 'N/A'
        ? notFoundPoster
        : movie.Poster;

    return (
        <li onClick={() => onClick(movie)}>
            <img
                src={imageUrl} 
                alt={movie.Title}
                className="dropdown-poster"
                onError={handleItemImageError} 
            />
            <span>{movie.Title} ({movie.Year})</span>
        </li>
    );
};

export default SearchDropdownItem;