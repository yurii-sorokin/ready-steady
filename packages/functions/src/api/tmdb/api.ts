/* eslint-disable @typescript-eslint/camelcase */
import got from 'got';
import { config } from '../../config';

export const tmdbApi = got.extend({
  searchParams: { api_key: config().api.tmdb_key },
  headers: {
    'User-Agent': 'ReadySteadyRelease/1.0'
  }
});
