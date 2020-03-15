import React, { FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import LazyLoad from 'react-lazyload';
import { useModal } from 'react-modal-hook';
import Truncate from 'react-truncate';
import { Movie } from '../../../api/tmdb/types';
import { Size } from '../../../design-system';
import { Subscription } from '../../../firebase/store';
import { useIgnoreClick } from '../../../hooks/use-ignore-click';
import {
  Card,
  CardContent,
  CardFooter,
  CardPoster,
  CardTitle
} from '../../../shared/card';
import { SubscriptionIcon } from '../../../shared/card/subscription';
import { Modal } from '../../../shared/modal';
import { MovieDetails } from '../details';

interface MovieCardProps {
  movie: Movie;
  maxPopularity: number;
  index: number;
  subscription?: Subscription;
}

export const MovieCard: FC<MovieCardProps> = ({
  movie,
  maxPopularity,
  index,
  subscription
}) => {
  const rate = movie.popularity / maxPopularity;
  const size = rate >= 0.05 ? Size.sm : Size.xs;
  const bellRef = useRef<HTMLElement>(null);

  const [showModal, hideModal] = useModal(
    () =>
      createPortal(
        <Modal onClose={hideModal}>
          <MovieDetails
            movie={movie}
            onClick={hideModal}
            subscription={subscription}
          />
        </Modal>,
        document.body
      ),
    [movie, subscription]
  );

  const onCardClick = useIgnoreClick(showModal, [bellRef]);

  return (
    <Card index={index} size={size} onClick={onCardClick}>
      <SubscriptionIcon
        on={!!subscription}
        type="movie"
        id={movie.id}
        title={movie.title}
        date={movie.release_date}
        ref={bellRef as any}
      />
      <CardContent>
        <LazyLoad>
          <CardPoster alt={movie.title} src={movie.poster_path} />
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
  );
};
