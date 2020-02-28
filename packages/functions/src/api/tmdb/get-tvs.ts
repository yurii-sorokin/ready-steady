/* eslint-disable @typescript-eslint/camelcase */
import { createPeriod } from '../../utils/date';
import { tmdbApi } from './api';
import { paginate, prefixPoster, resolveRegion } from './utils';
import { TvShow, SearchResult } from './types';

export interface GetTvsOptions {
  date: string;
  language: string;
  region: string;
}

export type TvsResponse = SearchResult<TvShow>;

export const getTvs = async ({
  date,
  language = '',
  region = resolveRegion(language)
}: GetTvsOptions) => {
  const { from, to } = createPeriod(date);

  const searchParams = {
    language,
    region,
    'first_air_date.gte': from,
    'first_air_date.lte': to,
    sort_by: 'popularity.desc',
    append_to_response: 'videos,external_ids',
    page: 1
  };

  const url = `https://api.themoviedb.org/3/discover/tv`;
  const data = await tmdbApi(url, { searchParams }).json<TvsResponse>();
  const results = await paginate(url, searchParams, data);

  return results.map(prefixPoster);
};
