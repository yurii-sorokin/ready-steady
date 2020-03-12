import React, { FC, useCallback, useMemo } from 'react';
import { Game } from '../../api/rawg/types';
import { useGroupByDate } from '../../hooks/use-group-by-date';
import { useSubscriptions } from '../../hooks/use-subscriptions';
import { Calendar } from '../../shared/calendar';
import { Spinner, SpinnerCenter } from '../../shared/spinner';
import { GameCard } from './card';
import { useGames, useGamesBg } from './use-games';

export const Games: FC<{ date: Date }> = ({ date }) => {
  const { data: games = [], loading } = useGames(date);
  const subscriptions = useSubscriptions({ date, type: 'game' });

  const maxAdded = useMemo(
    () => games.slice(0, 10).reduce((r, g) => r + g.added || 0, 0) / 10,
    [games]
  );
  const gamesByDay = useGroupByDate(games, 'released');
  const bgUrl = useGamesBg(games);
  const render = useCallback(
    (item, { subscription }) => (
      <GameCard game={item} maxAdded={maxAdded} subscription={subscription} />
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
      date={date}
      subscriptions={subscriptions}
      bgUrl={bgUrl}
      dataGroupedByDay={gamesByDay}
      maxColumnCount={3}
      render={render}
    />
  );
};

export default Games;
