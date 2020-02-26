import { findFirst } from 'fp-ts/lib/Array';
import { flow } from 'fp-ts/lib/function';
import { map, toUndefined } from 'fp-ts/lib/Option';
import { useCallback, useMemo } from 'react';
import { getMovieDetails, getMovies } from '../../api/tmdb/movies';
import { Movie, MovieDetails, AppendVideos } from '../../api/tmdb/types';
import { RequestState, useRequest } from '../../api/use-request';
import { useLocale } from '../../i18n';

export const useMovies = (date: Date): RequestState<Movie[]> => {
  const locale = useLocale();
  const request = useCallback(() => getMovies({ date, locale }), [
    date,
    locale
  ]);

  return useRequest(request);
};

export const useMovieDetails = (
  id: number
): RequestState<AppendVideos<MovieDetails>> => {
  const locale = useLocale();
  const request = useCallback(() => getMovieDetails({ id, locale }), [
    id,
    locale
  ]);

  return useRequest(request);
};

export const useMovieBg = (movies: Movie[]): string | null | undefined =>
  useMemo(() => {
    const getImg = (item: Movie) => item.backdrop_path;

    return flow(
      findFirst(flow(getImg, Boolean)),
      map(getImg),
      toUndefined
    )(movies);
  }, [movies]);
