import getDate from 'date-fns/getDate';
import { groupBy } from 'fp-ts/lib/NonEmptyArray';
import { useMemo } from 'react';

export const useGroupByDate = <T extends unknown>(
  data: T[],
  dateProp: keyof T
) => {
  return useMemo(() => {
    const toDay = (value: unknown) =>
      String(getDate(new Date(value as string)));
    const day = (item: T) => String(toDay(item[dateProp]));

    return groupBy(day)(data);
  }, [data, dateProp]);
};
