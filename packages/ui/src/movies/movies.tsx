import React, { FC, useCallback, useMemo } from 'react';
import { useModal } from 'react-modal-hook';
import Truncate from 'react-truncate';
import { Size } from '../design-system';
import { Calendar } from '../shared/calendar';
import { Card, CardFooter, CardPoster, CardTitle } from '../shared/card';
import { Modal, ModalOverlay } from '../shared/modal';
import { useGroupByDate } from '../hooks/use-group-by-date';
import { MovieDetails } from './details';
import { useMovieBg, useMovies } from './use-movies';
import { Movie } from '../api/movies';

export const MovieCard: FC<{ movie: Movie; maxPopularity: number }> = ({
  movie,
  maxPopularity
}) => {
  const rate = movie.popularity / maxPopularity;
  const size = rate >= 0.05 ? Size.sm : Size.xs;

  const [showModal, hideModal] = useModal(
    () => (
      <ModalOverlay onClick={hideModal}>
        <Modal>
          <MovieDetails movie={movie} />
        </Modal>
      </ModalOverlay>
    ),
    [movie]
  );

  return (
    <>
      <Card size={size} onClick={showModal}>
        <CardPoster src={movie.poster_path} />
        <CardFooter>
          <CardTitle>
            <Truncate lines={3} trimWhitespace>
              {movie.title}
            </Truncate>
          </CardTitle>
        </CardFooter>
      </Card>
    </>
  );
};

export const Movies: FC<{ date: Date }> = ({ date }) => {
  const { data: movies = [] } = useMovies(date);
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
