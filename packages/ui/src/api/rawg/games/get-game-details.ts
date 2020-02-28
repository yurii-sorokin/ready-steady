import { Locale } from '../../../i18n';
import { getApi } from '../../get-api';
import { GameDetails } from '../types';

export interface GetGameDetailsOptions {
  id: number;
  locale: Locale;
}

export const getGameDetails = ({
  id,
  locale
}: GetGameDetailsOptions): Promise<GameDetails> => {
  const api = getApi();
  return api(`/api/games/${id}`, {
    language: locale
  }).then(({ data }) => data);
};
