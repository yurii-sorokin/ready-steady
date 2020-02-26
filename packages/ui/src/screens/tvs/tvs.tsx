import React, { FC, useCallback, useMemo } from 'react';
import { TvShow } from '../../api/tmdb/types';
import { useGroupByDate } from '../../hooks/use-group-by-date';
import { Calendar } from '../../shared/calendar';
import { Spinner, SpinnerCenter } from '../../shared/spinner';
import { TvCard } from './card';
import { useTvBg, useTvs } from './use-tvs';

export const Tvs: FC<{ date: Date }> = ({ date }) => {
  const { data: tvs = [], loading } = useTvs(date);
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

  if (loading) {
    return (
      <SpinnerCenter>
        <Spinner />
      </SpinnerCenter>
    );
  }

  return (
    <Calendar<TvShow>
      date={date}
      bgUrl={bgUrl}
      dataGroupedByDay={tvsByDay}
      maxColumnCount={3}
      render={render}
    />
  );
};
