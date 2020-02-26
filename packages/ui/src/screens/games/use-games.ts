import { findFirst } from 'fp-ts/lib/Array';
import { flow } from 'fp-ts/lib/function';
import { map, toUndefined } from 'fp-ts/lib/Option';
import { useCallback, useMemo } from 'react';
import { Game, GameDetails } from '../../api/rawg/types';
import { getGameDetails, getGames } from '../../api/rawg/games';
import { useLocale } from '../../i18n';
import { RequestState, useRequest } from '../../api/use-request';

export const useGames = (date: Date): RequestState<Game[]> => {
  const locale = useLocale();
  const request = useCallback(() => getGames({ date, locale }), [date, locale]);

  return useRequest(request);
};

export const useGameDetails = (id: number): RequestState<GameDetails> => {
  const locale = useLocale();
  const request = useCallback(() => getGameDetails({ id, locale }), [
    id,
    locale
  ]);

  return useRequest(request);
};

export const useGamesBg = (games: Game[]): string | undefined =>
  useMemo(() => {
    const getImg = (item: Game) => item.background_image;

    return flow(
      findFirst<Game>(flow(getImg, Boolean)),
      map(getImg),
      toUndefined
    )(games);
  }, [games]);
