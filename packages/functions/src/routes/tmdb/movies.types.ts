import { ListResponse, DetailsResponse } from './response.types';

export interface Movie {
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  id: string;
  title: string;
  release_date: string;
}

export interface Video {
  embed: string;
  key: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
}

export interface Genre {
  name: string;
}

export interface MovieDetails {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  videos: { results: Video[] };
  genres: Genre[];
  production_countries: ProductionCountry[];
}

export type MoviesResponse = ListResponse<Movie>;

export type MovieDetailsResponse = DetailsResponse<MovieDetails>;
