/* eslint-disable @typescript-eslint/camelcase */
import { createPeriod } from '../../utils/date';
import { tmdbApi } from './api';
import { paginate, prefixPoster, resolveRegion } from './utils';
import { Movie, SearchResult } from './types';

export interface GetMoviesOptions {
  date: string;
  language: string;
  region: string;
}

export type MoviesResponse = SearchResult<Movie>;

export const getMovies = async ({
  date,
  language = '',
  region = resolveRegion(language)
}: GetMoviesOptions) => {
  const { from, to } = createPeriod(date);

  const searchParams = {
    language,
    region,
    'release_date.gte': from,
    'release_date.lte': to,
    with_release_type: '2|3',
    sort_by: 'popularity.desc',
    page: 1
  };

  const url = `https://api.themoviedb.org/3/discover/movie`;
  const data = await tmdbApi(url, { searchParams }).json<MoviesResponse>();
  const results = await paginate(url, searchParams, data);

  return results.map(prefixPoster);
};
