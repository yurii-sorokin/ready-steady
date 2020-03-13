import React, { FC, useCallback, useMemo, memo } from 'react';
import { TvShow } from '../../api/tmdb/types';
import { useSubscriptions } from '../../hooks/use-subscriptions';
import { Calendar } from '../../shared/calendar';
import { Spinner, SpinnerCenter } from '../../shared/spinner';
import { TvCard } from './card';
import { useTvBg, useTvs } from './use-tvs';

const useMaxPopularity = (tvs: TvShow[]) =>
  useMemo(
    () => tvs.slice(0, 10).reduce((r, m) => r + m.popularity || 0, 0) / 10,
    [tvs]
  );

export interface TvsProps {
  date: Date;
}

export const Tvs: FC<TvsProps> = memo(({ date }) => {
  const { data: tvs = [], loading } = useTvs(date);
  const subscriptions = useSubscriptions({ date, type: 'tv' });
  const maxPopularity = useMaxPopularity(tvs);
  const bgUrl = useTvBg(tvs);

  const render = useCallback(
    (item, { subscription, index }) => (
      <TvCard
        tv={item}
        index={index}
        maxPopularity={maxPopularity}
        subscription={subscription}
      />
    ),
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
      data={tvs}
      groupBy="first_air_date"
      date={date}
      bgUrl={bgUrl}
      subscriptions={subscriptions}
      maxColumnCount={3}
      render={render}
    />
  );
});

export default Tvs;
