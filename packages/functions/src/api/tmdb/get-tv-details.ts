/* eslint-disable @typescript-eslint/camelcase */
import { tmdbApi } from './api';
import { AppendVideos, TvShowDetails } from './types';
import { ensureVideos, prefixNetworks, prefixPoster } from './utils';

export interface GetTvDetailsOptions {
  id: string;
  language: string;
}

export type TvDetailsResponse = AppendVideos<TvShowDetails>;

export const getTvDetails = async ({
  id,
  language = ''
}: GetTvDetailsOptions) => {
  const searchParams = {
    language,
    append_to_response: 'videos,external_ids'
  };

  const url = `https://api.themoviedb.org/3/tv/${id}`;
  const data = await tmdbApi(url, { searchParams }).json<TvDetailsResponse>();

  return await ensureVideos(prefixNetworks(prefixPoster(data)));
};
