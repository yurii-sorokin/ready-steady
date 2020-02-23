import { ListResponse, DetailsResponse } from './response.types';

export interface Tv {
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  id: string;
  name: string;
  first_air_date: string;
}

export interface Video {
  embed: string;
  key: string;
}

export interface Network {
  logo_path: string;
}

export interface Genre {
  name: string;
}

export interface TvDetails {
  id: string;
  name: string;
  overview?: string;
  genres: Genre[];
  networks: Network[];
  poster_path: string;
  backdrop_path: string;
  videos: { results: Video[] };
}

export type TvsResponse = ListResponse<Tv>;

export type TvDetailsResponse = DetailsResponse<TvDetails>;
