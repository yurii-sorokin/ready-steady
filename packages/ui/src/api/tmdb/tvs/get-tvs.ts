import format from 'date-fns/format';
import { Locale } from '../../../i18n';
import { getApi } from '../../get-api';
import { TvShow } from '../types';

export interface GetTvsOptions {
  date: Date;
  locale: Locale;
}

export const getTvs = ({ date, locale }: GetTvsOptions): Promise<TvShow[]> => {
  const api = getApi();
  return api<TvShow[]>('api/tvs', {
    date: format(date, 'yyyy-MM'),
    region: locale,
    language: locale
  }).then(({ data }) => data);
};
