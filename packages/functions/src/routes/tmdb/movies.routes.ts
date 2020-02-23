/* eslint-disable @typescript-eslint/camelcase */
import { Router } from 'express';
import { format, parse, startOfMonth, endOfMonth } from 'date-fns';
import { tmdbApi } from './api';
import { paginate, prefixPoster, ensureVideos } from './utils';
import { MoviesResponse, MovieDetailsResponse } from './movies.types';

export const moviesRouter = Router();

moviesRouter.post('/movies', async (req, res, next) => {
  try {
    const query = req.body.data || {};
    const { language = '', region = '' } = query;

    const date = parse(query.date, 'yyyy-MM', Date.now());
    const from = format(startOfMonth(date), 'yyyy-MM-dd');
    const to = format(endOfMonth(date), 'yyyy-MM-dd');

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
    res.send({ data: results.map(prefixPoster) });
  } catch (err) {
    next(err);
  }
});

moviesRouter.post('/movies/:id', async (req, res, next) => {
  try {
    const query = req.body.data || {};
    const { language = '' } = query;

    const searchParams = {
      language,
      append_to_response: 'videos,external_ids'
    };

    const url = `https://api.themoviedb.org/3/movie/${req.params.id}`;
    const data = await tmdbApi(url, { searchParams }).json<
      MovieDetailsResponse
    >();
    const videos = await ensureVideos(data);
    res.send({ data: prefixPoster({ ...data, videos }) });
  } catch (err) {
    next(err);
  }
});
