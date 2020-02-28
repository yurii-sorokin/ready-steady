import { Locale } from '../../../i18n';
import { getApi } from '../../get-api';
import { TvShowDetails, AppendVideos } from '../types';

export interface GetTvDetailsOptions {
  id: number;
  locale: Locale;
}

export const getTvDetails = ({
  id,
  locale
}: GetTvDetailsOptions): Promise<AppendVideos<TvShowDetails>> => {
  const api = getApi();
  return api(`/api/tvs/${id}`, {
    language: locale
  }).then(({ data }) => data);
};
