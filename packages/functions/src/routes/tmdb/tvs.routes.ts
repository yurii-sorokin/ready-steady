/* eslint-disable @typescript-eslint/camelcase */
import { Router } from 'express';
import { format, parse, startOfMonth, endOfMonth } from 'date-fns';
import { tmdbApi } from './api';
import { paginate, prefixPoster, ensureVideos, prefixNetworks } from './utils';
import { TvsResponse, TvDetailsResponse } from './tvs.types';

export const tvsRouter = Router();

tvsRouter.post('/tvs', async (req, res, next) => {
  try {
    const query = req.body.data || {};
    const { language = '', region = '' } = query;

    const date = parse(query.date, 'yyyy-MM', Date.now());
    const from = format(startOfMonth(date), 'yyyy-MM-dd');
    const to = format(endOfMonth(date), 'yyyy-MM-dd');

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
    res.send({ data: results.map(prefixPoster) });
  } catch (err) {
    next(err);
  }
});

tvsRouter.post('/tvs/:id', async (req, res, next) => {
  try {
    const query = req.body.data || {};
    const { language = '' } = query;

    const searchParams = {
      language,
      append_to_response: 'videos,external_ids'
    };

    const url = `https://api.themoviedb.org/3/tv/${req.params.id}`;
    const data = await tmdbApi(url, { searchParams }).json<TvDetailsResponse>();
    const videos = await ensureVideos(data);

    res.send({ data: prefixNetworks(prefixPoster({ ...data, videos })) });
  } catch (err) {
    next(err);
  }
});
