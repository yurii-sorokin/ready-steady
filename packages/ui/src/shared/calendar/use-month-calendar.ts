import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval';
import endOfISOWeek from 'date-fns/endOfISOWeek';
import endOfMonth from 'date-fns/endOfMonth';
import startOfISOWeek from 'date-fns/startOfISOWeek';
import startOfMonth from 'date-fns/startOfMonth';
import { useMemo } from 'react';

type Options = {
  date: Date;
};

export const createMonthCalendar = ({ date }: Options): Date[][] => {
  const matrix = eachWeekOfInterval(
    { start: startOfMonth(date), end: endOfMonth(date) },
    { weekStartsOn: 1 }
  );

  return matrix.map(weekDay =>
    eachDayOfInterval({
      start: startOfISOWeek(weekDay),
      end: endOfISOWeek(weekDay)
    })
  );
};

export const useMonthCalendar = ({ date }: Options): Date[][] =>
  useMemo(() => createMonthCalendar({ date }), [date]);
