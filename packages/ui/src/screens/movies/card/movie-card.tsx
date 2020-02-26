import React, { FC } from 'react';
import { useModal } from 'react-modal-hook';
import Truncate from 'react-truncate';
import LazyLoad from 'react-lazyload';
import { Movie } from '../../../api/tmdb/types';
import { Size } from '../../../design-system';
import {
  Card,
  CardFooter,
  CardPoster,
  CardTitle,
  CardContent
} from '../../../shared/card';
import { Modal, ModalOverlay } from '../../../shared/modal';
import { MovieDetails } from '../details';

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
        <CardContent>
          <LazyLoad>
            <CardPoster src={movie.poster_path} />
          </LazyLoad>
        </CardContent>
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
