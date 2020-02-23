import { Locale } from '../../i18n';
import { getApi } from '../get-api';
import { TvDetails } from './tvs.types';

export interface GetTvDetailsOptions {
  id: string;
  locale: Locale;
}

export const getTvDetails = ({
  id,
  locale
}: GetTvDetailsOptions): Promise<TvDetails> => {
  const api = getApi();
  return api(`api/tvs/${id}`, {
    language: locale
  }).then(({ data }) => data);
};
