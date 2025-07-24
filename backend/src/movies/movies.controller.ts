import { Controller,  Get,  Param,  Query,} from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('api/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
   
  //Retorna uma lista de filmes para pesquisa.
  //Pode ser filtrada opcionalmente por um termo de busca no título.
  @Get('')
  getMoviesForSearch(@Query('search') searchTerm?: string) {
    return this.moviesService.getSearchMovies(searchTerm);
  }

   //Retorna a lista completa de filmes com todos os seus detalhes.
  @Get('details/all')
  getAllMovieDetails() {
    return this.moviesService.getAllMoviesDetails();
  }

   //Retorna os detalhes completos de um filme específico pelo seu imdbID.
  @Get(':imdbID')
  getMovieDetailById(@Param('imdbID') imdbID: string) {
    return this.moviesService.getMovieDetail(imdbID);
  }
}