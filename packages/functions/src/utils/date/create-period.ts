import parse from 'date-fns/parse';
import format from 'date-fns/format';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';

export const createPeriod = (dateString = '') => {
  const date = parse(dateString, 'yyyy-MM', Date.now());

  const from = format(startOfMonth(date), 'yyyy-MM-dd');
  const to = format(endOfMonth(date), 'yyyy-MM-dd');

  return { from, to };
};
