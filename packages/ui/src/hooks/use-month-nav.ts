import { useState, useCallback } from 'react';
import subMonths from 'date-fns/subMonths';
import addMonths from 'date-fns/addMonths';

export const useMonthNav = (now: Date): [Date, () => void, () => void] => {
  const [date, setDate] = useState(now);
  const prevMonth = useCallback(() => setDate(subMonths(date, 1)), [date]);
  const nextMonth = useCallback(() => setDate(addMonths(date, 1)), [date]);

  return [date, prevMonth, nextMonth];
};
