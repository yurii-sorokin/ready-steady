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
  videos: Video[];
  genres: Genre[];
  production_countries: ProductionCountry[];
}
