import format from 'date-fns/format';
import { Locale } from '../../i18n';
import { getApi } from '../get-api';
import { Tv } from './tvs.types';

export interface GetTvsOptions {
  date: Date;
  locale: Locale;
}

export const getTvs = ({ date, locale }: GetTvsOptions): Promise<Tv[]> => {
  const api = getApi();
  return api<Tv[]>('api/tvs', {
    date: format(date, 'yyyy-MM'),
    region: locale,
    language: locale
  }).then(({ data }) => data);
};
