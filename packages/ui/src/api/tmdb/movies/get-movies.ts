import format from 'date-fns/format';
import { Locale } from '../../../i18n';
import { getApi } from '../../get-api';
import { Movie } from '../types';

export interface GetMoviesOptions {
  date: Date;
  locale: Locale;
}

export const getMovies = ({
  date,
  locale
}: GetMoviesOptions): Promise<Movie[]> => {
  const api = getApi();
  return api('api/movies', {
    date: format(date, 'yyyy-MM'),
    region: locale,
    language: locale
  }).then(({ data }) => data);
};
