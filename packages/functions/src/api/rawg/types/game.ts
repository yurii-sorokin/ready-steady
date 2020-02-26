import { AddedByStatus } from './added-by-status';
import { Clip } from './clip';
import { Genre } from './genre';
import { Platform } from './platform';
import { Rating } from './rating';
import { Store } from './store';

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
