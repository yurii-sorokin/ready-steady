import { Locale } from '../../i18n';
import { GameDetails } from './games.types';
import { getApi } from '../get-api';

export interface GetGameDetailsOptions {
  id: number;
  locale: Locale;
}

export const getGameDetails = ({
  id,
  locale
}: GetGameDetailsOptions): Promise<GameDetails> => {
  const api = getApi();
  return api<GameDetails>(`api/games/${id}`, {
    language: locale
  }).then(({ data }) => data);
};
