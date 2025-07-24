import { Injectable, NotFoundException } from '@nestjs/common';
import { search, movieDetail } from "../../data/movies"


@Injectable()
export class MoviesService {

    private readonly moviesList  = search;
    private readonly moviesDetails = movieDetail;


    //Retorna a lista completa de filmes para pesquisa.
    getSearchMovies(searchItem?: string) {
        let results = this.moviesList;

        if (searchItem) {
            results = results.filter(movie => movie.Title.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()))
        }
        return results;
    }
    //Retorna os detalhes de um filme especifico com base no imdbID
    getMovieDetail(imdb: string) {
        const movie = this.moviesDetails.find(m => m.imdbID === imdb)

        if (!movie) {
            throw new NotFoundException(`Detalhes do filme com ID "${imdb}" não encontrados.`)
        }

        return movie;
    }

    //Retorna todos os filmes e detalhes.
    getAllMoviesDetails() {
        return this.moviesDetails;
    }
}
