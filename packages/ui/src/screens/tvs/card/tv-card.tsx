import React, { FC, MouseEvent, useCallback, useRef } from 'react';
import LazyLoad from 'react-lazyload';
import { useModal } from 'react-modal-hook';
import Truncate from 'react-truncate';
import { TvShow } from '../../../api/tmdb/types';
import { Size } from '../../../design-system';
import { Subscription } from '../../../firebase/store';
import {
  Card,
  CardContent,
  CardFooter,
  CardPoster,
  CardTitle
} from '../../../shared/card';
import { SubscriptionIcon } from '../../../shared/card/subscription';
import { Modal } from '../../../shared/modal';
import { TvDetails } from '../details';
import { createPortal } from 'react-dom';

interface TvCardProps {
  tv: TvShow;
  maxPopularity: number;
  index: number;
  subscription?: Subscription;
}

export const TvCard: FC<TvCardProps> = ({
  tv,
  maxPopularity,
  index,
  subscription
}) => {
  const rate = tv.popularity / maxPopularity;
  const size = rate >= 0.5 ? Size.sm : Size.xs;

  const [showModal, hideModal] = useModal(
    () =>
      createPortal(
        <Modal onClose={hideModal}>
          <TvDetails tv={tv} onClick={hideModal} subscription={subscription} />
        </Modal>,
        document.body
      ),
    [tv, subscription]
  );

  const bellRef = useRef<HTMLElement>(null);

  const onCardClick = useCallback(
    (e: MouseEvent) => {
      if (!bellRef.current || !bellRef.current.contains(e.target as any)) {
        showModal();
      }
    },
    [showModal]
  );

  return (
    <Card index={index} size={size} onClick={onCardClick}>
      <SubscriptionIcon
        on={!!subscription}
        type="tv"
        id={tv.id}
        title={tv.name}
        date={tv.first_air_date}
        ref={bellRef as any}
      />
      <CardContent>
        <LazyLoad>
          <CardPoster alt={tv.name} src={tv.poster_path} />
        </LazyLoad>
      </CardContent>
      <CardFooter>
        <CardTitle>
          <Truncate lines={3} trimWhitespace>
            {tv.name}
          </Truncate>
        </CardTitle>
      </CardFooter>
    </Card>
  );
};
