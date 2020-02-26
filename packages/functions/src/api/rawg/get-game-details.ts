import { rawgApi } from './api';
import { GameDetails } from './types';

export interface GetGameDetailsOptions {
  id: string;
  language: string;
}

export type GameDetailsResponse = GameDetails;

export const getGameDetails = ({
  id,
  language = ''
}: GetGameDetailsOptions) => {
  const searchParams = {
    lang: language
  };

  const url = `https://api.rawg.io/api/games/${id}`;

  return rawgApi(url, { searchParams }).json<GameDetailsResponse>();
};
