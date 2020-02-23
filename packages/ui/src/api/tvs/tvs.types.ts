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
  videos: Video[];
}
