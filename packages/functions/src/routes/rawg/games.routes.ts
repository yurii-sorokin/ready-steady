/* eslint-disable @typescript-eslint/camelcase */
import { Router } from 'express';
import { format, parse, startOfMonth, endOfMonth } from 'date-fns';
import { Game, GameDetails } from './games.types';
import { rawgApi } from './api';

export const gamesRouter = Router();

interface GamesResponse {
  results: Game[];
  prev?: string;
  next?: string;
}

type GameDetailsResponse = GameDetails;

gamesRouter.post('/games', async (req, res, next) => {
  try {
    const query = req.body.data || req.query || {};
    const date = parse(query.date, 'yyyy-MM', Date.now());
    const from = format(startOfMonth(date), 'yyyy-MM-dd');
    const to = format(endOfMonth(date), 'yyyy-MM-dd');
    const { language = '' } = query;

    const searchParams = {
      lang: language,
      dates: `${from},${to}`,
      exclude_additions: true,
      ordering: '-added'
    };

    const url = 'https://api.rawg.io/api/games';
    const data = await rawgApi(url, { searchParams }).json<GamesResponse>();

    let results = data.results;
    let nextData = data;
    let page = 1;

    while (nextData.next && page < 3) {
      nextData = await rawgApi(nextData.next).json<GamesResponse>();
      results = [...results, ...nextData.results];
      page++;
    }

    res.send({ data: results });
  } catch (err) {
    next(err);
  }
});

gamesRouter.post('/games/:id', async (req, res, next) => {
  try {
    const query = req.body.data || req.query || {};
    const { language = '' } = query;

    const searchParams = {
      lang: language
    };

    const url = `https://api.rawg.io/api/games/${req.params.id}`;
    const data = await rawgApi(url, { searchParams }).json<
      GameDetailsResponse
    >();
    res.send({ data });
  } catch (err) {
    next(err);
  }
});
