// Define a estrutura para um item no array 'search'
export declare const search: Array<{
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}>;

// Define a estrutura para um item no array 'movieDetail'
export declare const movieDetail: Array<{
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Awards: string;
    Poster: string;
    Ratings: Array<{
        Source: string;
        Value: string;
    }>;
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Plot: string; // Adicionei o Plot aqui, pois ele está no movieDetail
    Language: string; // Adicionei o Language aqui
    Country: string; // Adicionei o Country aqui
}>;