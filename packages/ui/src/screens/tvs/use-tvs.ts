import { findFirst } from 'fp-ts/lib/Array';
import { flow } from 'fp-ts/lib/function';
import { map, toUndefined } from 'fp-ts/lib/Option';
import { useCallback, useMemo } from 'react';
import { getTvDetails, getTvs } from '../../api/tmdb/tvs';
import { AppendVideos, TvShow, TvShowDetails } from '../../api/tmdb/types';
import { RequestState, useRequest } from '../../api/use-request';
import { useLocale } from '../../i18n';

export const useTvs = (date: Date): RequestState<TvShow[]> => {
  const locale = useLocale();
  const request = useCallback(() => getTvs({ date, locale }), [date, locale]);

  return useRequest(request);
};

export const useTvDetails = (
  id: number
): RequestState<AppendVideos<TvShowDetails>> => {
  const locale = useLocale();
  const request = useCallback(() => getTvDetails({ id, locale }), [id, locale]);

  return useRequest(request);
};

export const useTvBg = (movies: TvShow[]): string | undefined =>
  useMemo(() => {
    const getImg = (item: TvShow) => item.backdrop_path;

    return flow(
      findFirst(flow(getImg, Boolean)),
      map(getImg),
      toUndefined
    )(movies);
  }, [movies]);
