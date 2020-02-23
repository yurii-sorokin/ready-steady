import { findFirst } from 'fp-ts/lib/Array';
import { flow } from 'fp-ts/lib/function';
import { map, toUndefined } from 'fp-ts/lib/Option';
import { useCallback, useMemo } from 'react';
import { getTvDetails, getTvs, Tv, TvDetails } from '../api/tvs';
import { useLocale } from '../i18n';
import { RequestState, useRequest } from '../api/use-request';

export const useTvs = (date: Date): RequestState<Tv[]> => {
  const locale = useLocale();
  const request = useCallback(() => getTvs({ date, locale }), [date, locale]);

  return useRequest(request);
};

export const useTvDetails = (id: string): RequestState<TvDetails> => {
  const locale = useLocale();
  const request = useCallback(() => getTvDetails({ id, locale }), [id, locale]);

  return useRequest(request);
};

export const useTvBg = (movies: Tv[]): string | undefined =>
  useMemo(() => {
    const getImg = (item: Tv) => item.backdrop_path;

    return flow(
      findFirst(flow(getImg, Boolean)),
      map(getImg),
      toUndefined
    )(movies);
  }, [movies]);
