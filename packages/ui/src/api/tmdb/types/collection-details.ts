import { Collection } from './collection';
import { Movie } from './movie';

export interface CollectionDetails extends Collection {
  overview: string;
  parts: Movie[];
}
