import { Locale } from '../../i18n';
import format from 'date-fns/format';
import { Game } from './games.types';
import { getApi } from '../get-api';

export interface GetGamesOptions {
  date: Date;
  locale: Locale;
}

export const getGames = ({
  date,
  locale
}: GetGamesOptions): Promise<Game[]> => {
  const api = getApi();
  return api<Game[]>('api/games', {
    date: format(date, 'yyyy-MM'),
    language: locale
  }).then(({ data }) => data);
};
