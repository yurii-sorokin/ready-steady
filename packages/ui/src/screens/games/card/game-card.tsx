import React, { FC } from 'react';
import { useModal } from 'react-modal-hook';
import Truncate from 'react-truncate';
import LazyLoad from 'react-lazyload';
import { Game } from '../../../api/rawg/types';
import { Size } from '../../../design-system';
import {
  Card,
  CardContent,
  CardFooter,
  CardPoster,
  CardTitle
} from '../../../shared/card';
import { Modal, ModalOverlay } from '../../../shared/modal';
import { GameDetails } from '../details';
import { PlatformList } from '../platform-list';

export const GameCard: FC<{ game: Game; maxAdded: number }> = ({
  game,
  maxAdded
}) => {
  const rate = game.added / maxAdded;
  const size = rate >= 0.7 ? Size.md : rate < 0.05 ? Size.xs : Size.sm;

  const [showModal, hideModal] = useModal(
    () => (
      <ModalOverlay onClick={hideModal}>
        <Modal>
          <GameDetails game={game} />
        </Modal>
      </ModalOverlay>
    ),
    [game]
  );

  return (
    <>
      <Card size={size} onClick={showModal}>
        <CardContent>
          <LazyLoad>
            <CardPoster src={game.background_image} />
          </LazyLoad>
        </CardContent>
        <CardFooter>
          {size !== Size.xs && <PlatformList platforms={game.platforms} />}
          <CardTitle>
            <Truncate lines={3} trimWhitespace>
              {game.name}
            </Truncate>
          </CardTitle>
        </CardFooter>
      </Card>
    </>
  );
};
