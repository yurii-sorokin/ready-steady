import { Clip } from './clip';
import { Genre } from './genre';
import { Platform } from './platform';

export interface GameDetails {
  id: string;
  name: string;
  background_image: string;
  genres: Genre[];
  platforms: Platform[];
  clip: Clip;
  description_raw: string;
}
