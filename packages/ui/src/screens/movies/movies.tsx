import React, { FC, useCallback, useMemo } from 'react';
import { Movie } from '../../api/tmdb/types';
import { useGroupByDate } from '../../hooks/use-group-by-date';
import { Calendar } from '../../shared/calendar';
import { Spinner, SpinnerCenter } from '../../shared/spinner';
import { MovieCard } from './card';
import { useMovieBg, useMovies } from './use-movies';

export const Movies: FC<{ date: Date }> = ({ date }) => {
  const { data: movies = [], loading } = useMovies(date);
  const maxPopularity = useMemo(
    () => movies.slice(0, 10).reduce((r, m) => r + m.popularity || 0, 0) / 10,
    [movies]
  );

  const moviesByDay = useGroupByDate(movies, 'release_date');
  const bgUrl = useMovieBg(movies);
  const render = useCallback(
    item => <MovieCard movie={item} maxPopularity={maxPopularity} />,
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
      maxColumnCount={6}
      render={render}
    />
  );
};
