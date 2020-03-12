import { createPeriod } from '../../utils/date';
import { rawgApi } from './api';
import { paginate } from './utils';
import { Game, SearchResult } from './types';

export interface GetGamesOptions {
  date: string;
  language: string;
}

export type GamesResponse = SearchResult<Game>;

export const getGames = async ({ date, language = '' }: GetGamesOptions) => {
  const { from, to } = createPeriod(date);

  const searchParams = {
    lang: language,
    dates: `${from},${to}`,
    ordering: '-added'
  };

  const url = 'https://api.rawg.io/api/games';
  const data = await rawgApi(url, { searchParams }).json<GamesResponse>();
  const results = await paginate(data);

  return results;
};
