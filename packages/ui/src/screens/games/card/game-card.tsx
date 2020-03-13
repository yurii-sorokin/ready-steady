import React, { FC, MouseEvent, useCallback, useRef, memo } from 'react';
import LazyLoad from 'react-lazyload';
import { useModal } from 'react-modal-hook';
import Truncate from 'react-truncate';
import { Game } from '../../../api/rawg/types';
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
import { GameDetails } from '../details';
import { PlatformList } from '../platform-list';
import { createPortal } from 'react-dom';

interface GameCardProps {
  game: Game;
  maxAdded: number;
  subscription?: Subscription;
  index: number;
}

export const GameCard: FC<GameCardProps> = memo(
  ({ game, maxAdded, subscription, index }) => {
    const rate = game.added / maxAdded;
    const size = rate >= 0.7 ? Size.md : rate < 0.05 ? Size.xs : Size.sm;

    const [showModal, hideModal] = useModal(
      () =>
        createPortal(
          <Modal onClose={hideModal}>
            <GameDetails
              onClick={hideModal}
              game={game}
              subscription={subscription}
            />
          </Modal>,
          document.body
        ),
      [game, subscription]
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
        <CardContent>
          <SubscriptionIcon
            on={!!subscription}
            type="game"
            id={game.id}
            title={game.name}
            date={game.released}
            ref={bellRef as any}
          />
          <LazyLoad>
            <CardPoster
              alt={game.name}
              src={game.background_image?.replace(
                '/media/',
                '/media/crop/600/400/'
              )}
            />
          </LazyLoad>
        </CardContent>
        <CardFooter>
          <PlatformList platforms={game.platforms} />
          <CardTitle>
            <Truncate lines={3} trimWhitespace>
              {game.name}
            </Truncate>
          </CardTitle>
        </CardFooter>
      </Card>
    );
  }
);
