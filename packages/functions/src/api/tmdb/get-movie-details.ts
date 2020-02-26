/* eslint-disable @typescript-eslint/camelcase */
import { tmdbApi } from './api';
import { AppendVideos, MovieDetails } from './types';
import { ensureVideos, prefixPoster } from './utils';

export interface GetMovieDetailsOptions {
  id: string;
  language: string;
}

export type MovieDetailsResponse = AppendVideos<MovieDetails>;

export const getMovieDetails = async ({
  id,
  language
}: GetMovieDetailsOptions) => {
  const searchParams = {
    language,
    append_to_response: 'videos,external_ids'
  };

  const url = `https://api.themoviedb.org/3/movie/${id}`;
  const data = await tmdbApi(url, { searchParams }).json<
    MovieDetailsResponse
  >();

  return await ensureVideos(prefixPoster(data));
};
