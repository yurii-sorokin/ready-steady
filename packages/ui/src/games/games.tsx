import React, { FC, useCallback, useMemo } from 'react';
import { useModal } from 'react-modal-hook';
import Truncate from 'react-truncate';
import { Size } from '../design-system';
import { Game } from '../api/games';
import { Calendar } from '../shared/calendar';
import {
  Card,
  CardContent,
  CardFooter,
  CardPoster,
  CardTitle
} from '../shared/card';
import { Modal, ModalOverlay } from '../shared/modal';
import { useGroupByDate } from '../hooks/use-group-by-date';
import { GameDetails } from './details';
import { PlatformList } from './platform-list';
import { useGames, useGamesBg } from './use-games';

const GameCard: FC<{ game: Game; maxAdded: number }> = ({ game, maxAdded }) => {
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
          <CardPoster src={game.background_image} />
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

export const Games: FC<{ date: Date }> = ({ date }) => {
  const { data: games = [] } = useGames(date);
  const maxAdded = useMemo(
    () => games.slice(0, 10).reduce((r, g) => r + g.added || 0, 0) / 10,
    [games]
  );
  const gamesByDay = useGroupByDate(games, 'released');
  const bgUrl = useGamesBg(games);
  const render = useCallback(
    item => <GameCard game={item} maxAdded={maxAdded} />,
    [maxAdded]
  );

  return (
    <Calendar<Game>
      date={date}
      bgUrl={bgUrl}
      dataGroupedByDay={gamesByDay}
      maxColumnCount={3}
      render={render}
    />
  );
};
