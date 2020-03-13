import React, { FC, useCallback, useMemo, memo } from 'react';
import { Game } from '../../api/rawg/types';
import { useSubscriptions } from '../../hooks/use-subscriptions';
import { Calendar } from '../../shared/calendar';
import { Spinner, SpinnerCenter } from '../../shared/spinner';
import { GameCard } from './card';
import { useGames, useGamesBg } from './use-games';

const useMaxAdded = (games: Game[]) =>
  useMemo(() => games.slice(0, 10).reduce((r, g) => r + g.added || 0, 0) / 10, [
    games
  ]);

export interface GamesProps {
  date: Date;
}

export const Games: FC<GamesProps> = memo(({ date }) => {
  const { data: games = [], loading } = useGames(date);
  const subscriptions = useSubscriptions({ date, type: 'game' });
  const maxAdded = useMaxAdded(games);
  const bgUrl = useGamesBg(games);

  const render = useCallback(
    (item, { subscription, index }) => (
      <GameCard
        index={index}
        game={item}
        maxAdded={maxAdded}
        subscription={subscription}
      />
    ),
    [maxAdded]
  );

  if (loading) {
    return (
      <SpinnerCenter>
        <Spinner />
      </SpinnerCenter>
    );
  }

  return (
    <Calendar<Game>
      data={games}
      groupBy="released"
      date={date}
      subscriptions={subscriptions}
      bgUrl={bgUrl}
      maxColumnCount={3}
      render={render}
    />
  );
});

export default Games;
