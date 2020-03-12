import React, { FC, useCallback, useMemo } from 'react';
import { Movie } from '../../api/tmdb/types';
import { useGroupByDate } from '../../hooks/use-group-by-date';
import { useSubscriptions } from '../../hooks/use-subscriptions';
import { Calendar } from '../../shared/calendar';
import { Spinner, SpinnerCenter } from '../../shared/spinner';
import { MovieCard } from './card';
import { useMovieBg, useMovies } from './use-movies';

export const Movies: FC<{ date: Date }> = ({ date }) => {
  const { data: movies = [], loading } = useMovies(date);
  const subscriptions = useSubscriptions({ date, type: 'movie' });

  const maxPopularity = useMemo(
    () => movies.slice(0, 10).reduce((r, m) => r + m.popularity || 0, 0) / 10,
    [movies]
  );

  const moviesByDay = useGroupByDate(movies, 'release_date');
  const bgUrl = useMovieBg(movies);
  const render = useCallback(
    (item, { subscription }) => (
      <MovieCard
        movie={item}
        maxPopularity={maxPopularity}
        subscription={subscription}
      />
    ),
    [maxPopularity]
  );

  if (loading) {
    return (
      <SpinnerCenter>
        <Spinner />
      </SpinnerCenter>
    );
  }

  return (
    <Calendar<Movie>
      date={date}
      bgUrl={bgUrl}
      dataGroupedByDay={moviesByDay}
      subscriptions={subscriptions}
      maxColumnCount={6}
      render={render}
    />
  );
};

export default Movies;
