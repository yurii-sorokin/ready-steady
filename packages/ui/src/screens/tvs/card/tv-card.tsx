import React, { FC } from 'react';
import { useModal } from 'react-modal-hook';
import Truncate from 'react-truncate';
import LazyLoad from 'react-lazyload';
import { TvShow } from '../../../api/tmdb/types';
import { Size } from '../../../design-system';
import {
  Card,
  CardFooter,
  CardPoster,
  CardTitle,
  CardContent
} from '../../../shared/card';
import { Modal, ModalOverlay } from '../../../shared/modal';
import { TvDetails } from '../details';

export const TvCard: FC<{ tv: TvShow; maxPopularity: number }> = ({
  tv,
  maxPopularity
}) => {
  const rate = tv.popularity / maxPopularity;
  const size = rate >= 0.5 ? Size.sm : Size.xs;

  const [showModal, hideModal] = useModal(
    () => (
      <ModalOverlay onClick={hideModal}>
        <Modal>
          <TvDetails tv={tv} />
        </Modal>
      </ModalOverlay>
    ),
    [tv]
  );

  return (
    <>
      <Card size={size} onClick={showModal}>
        <CardContent>
          <LazyLoad>
            <CardPoster src={tv.poster_path} />
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
    </>
  );
};
