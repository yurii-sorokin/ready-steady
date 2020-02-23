import { Locale } from '../../i18n';
import { getApi } from '../get-api';
import { MovieDetails } from './movies.types';

export interface GetMovieDetailsOptions {
  id: string;
  locale: Locale;
}

export const getMovieDetails = ({
  id,
  locale
}: GetMovieDetailsOptions): Promise<MovieDetails> => {
  const api = getApi();
  return api<MovieDetails>(`api/movies/${id}`, {
    language: locale
  }).then(({ data }) => data);
};
