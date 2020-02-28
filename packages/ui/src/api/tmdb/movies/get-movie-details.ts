import { Locale } from '../../../i18n';
import { getApi } from '../../get-api';
import { MovieDetails, AppendVideos } from '../types';

export interface GetMovieDetailsOptions {
  id: number;
  locale: Locale;
}

export const getMovieDetails = ({
  id,
  locale
}: GetMovieDetailsOptions): Promise<AppendVideos<MovieDetails>> => {
  const api = getApi();
  return api(`/api/movies/${id}`, {
    language: locale
  }).then(({ data }) => data);
};
