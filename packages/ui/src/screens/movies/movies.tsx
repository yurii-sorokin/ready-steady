import React, { FC, useCallback, useMemo, memo } from 'react';
import { Movie } from '../../api/tmdb/types';
import { useSubscriptions } from '../../hooks/use-subscriptions';
import { Calendar } from '../../shared/calendar';
import { Spinner, SpinnerCenter } from '../../shared/spinner';
import { MovieCard } from './card';
import { useMovieBg, useMovies } from './use-movies';

const useMaxPopularity = (movies: Movie[]) =>
  useMemo(
    () => movies.slice(0, 10).reduce((r, m) => r + m.popularity || 0, 0) / 10,
    [movies]
  );

export interface MoviesProps {
  date: Date;
}

export const Movies: FC<MoviesProps> = memo(({ date }) => {
  const { data: movies = [], loading } = useMovies(date);
  const subscriptions = useSubscriptions({ date, type: 'movie' });
  const maxPopularity = useMaxPopularity(movies);
  const bgUrl = useMovieBg(movies);

  const render = useCallback(
    (item, { subscription, index }) => (
      <MovieCard
        movie={item}
        index={index}
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
      data={movies}
      groupBy="release_date"
      date={date}
      bgUrl={bgUrl}
      subscriptions={subscriptions}
      maxColumnCount={6}
      render={render}
    />
  );
});

export default Movies;
