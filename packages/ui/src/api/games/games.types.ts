export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Store {
  id: number;
  name: string;
  slug: string;
}

export interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface AddedByStatus {
  yet: number;
  owned: number;
  toplay: number;
  dropped: number;
  playing: number;
}

export interface Clip {
  clip: string;
  clips: Record<'320' | '640' | 'full', string>;
  video: string;
  preview: string;
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reviews_text_count: string;
  added: number;
  added_by_status: AddedByStatus;
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  genres: Genre[];
  stores: Store[];
  platforms: Platform[];
  parent_platforms: Platform[];
  clip: Clip;
}

export interface GameDetails {
  id: string;
  name: string;
  background_image: string;
  genres: Genre[];
  platforms: Platform[];
  clip: Clip;
  description_raw: string;
}
