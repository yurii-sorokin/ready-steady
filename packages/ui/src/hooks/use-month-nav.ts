import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';
import subMonths from 'date-fns/subMonths';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export const useMonthNav = (date: Date): [() => void, () => void] => {
  const history = useHistory();

  const prevMonth = useCallback(
    () => history.push(`${format(subMonths(date, 1), 'yyyy-MM')}`),
    [date, history]
  );
  const nextMonth = useCallback(
    () => history.push(`${format(addMonths(date, 1), 'yyyy-MM')}`),
    [date, history]
  );

  return [prevMonth, nextMonth];
};
