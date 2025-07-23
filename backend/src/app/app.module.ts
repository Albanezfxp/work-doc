import { MoviesService } from './../movies/movies.service';
// src/app.module.ts (exemplo de como ficaria)
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from 'src/movies/movies.module';
import { MoviesController } from 'src/movies/movies.controller';

@Module({
  imports: [MoviesModule],
  controllers: [AppController, MoviesController],
  providers: [AppService, MoviesService],
})
export class AppModule {}