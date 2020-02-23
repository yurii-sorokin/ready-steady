import React, { FC, useCallback, useMemo } from 'react';
import Truncate from 'react-truncate';
import { Size } from '../design-system';
import { Calendar } from '../shared/calendar';
import { Card, CardFooter, CardPoster, CardTitle } from '../shared/card';
import { useGroupByDate } from '../hooks/use-group-by-date';
import { TvDetails } from './details';
import { useTvBg, useTvs } from './use-tvs';
import { useModal } from 'react-modal-hook';
import { ModalOverlay, Modal } from '../shared/modal';
import { Tv } from '../api/tvs';

export const TvCard: FC<{ tv: Tv; maxPopularity: number }> = ({
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
        <CardPoster src={tv.poster_path} />
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

export const Tvs: FC<{ date: Date }> = ({ date }) => {
  const { data: tvs = [] } = useTvs(date);
  const maxPopularity = useMemo(
    () => tvs.slice(0, 10).reduce((r, m) => r + m.popularity || 0, 0) / 10,
    [tvs]
  );
  const tvsByDay = useGroupByDate(tvs, 'first_air_date');
  const bgUrl = useTvBg(tvs);
  const render = useCallback(
    item => <TvCard tv={item} maxPopularity={maxPopularity} />,
    [maxPopularity]
  );

  return (
    <Calendar<Tv>
      date={date}
      bgUrl={bgUrl}
      dataGroupedByDay={tvsByDay}
      maxColumnCount={3}
      render={render}
    />
  );
};
