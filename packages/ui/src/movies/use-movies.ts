import { findFirst } from 'fp-ts/lib/Array';
import { flow } from 'fp-ts/lib/function';
import { map, toUndefined } from 'fp-ts/lib/Option';
import { useCallback, useMemo } from 'react';
import { getMovieDetails, getMovies, Movie, MovieDetails } from '../api/movies';
import { useLocale } from '../i18n';
import { RequestState, useRequest } from '../api/use-request';

export const useMovies = (date: Date): RequestState<Movie[]> => {
  const locale = useLocale();
  const request = useCallback(() => getMovies({ date, locale }), [
    date,
    locale
  ]);

  return useRequest(request);
};

export const useMovieDetails = (id: string): RequestState<MovieDetails> => {
  const locale = useLocale();
  const request = useCallback(() => getMovieDetails({ id, locale }), [
    id,
    locale
  ]);

  return useRequest(request);
};

export const useMovieBg = (movies: Movie[]): string | undefined =>
  useMemo(() => {
    const getImg = (item: Movie) => item.backdrop_path;

    return flow(
      findFirst(flow(getImg, Boolean)),
      map(getImg),
      toUndefined
    )(movies);
  }, [movies]);
