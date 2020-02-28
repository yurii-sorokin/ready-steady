import { useParams } from 'react-router-dom';
import parse from 'date-fns/parse';
import isValid from 'date-fns/isValid';
import { useMemo } from 'react';

const now = new Date();

export const useDateParam = (): [Date, string] => {
  const { date: datePath = '' } = useParams();
  const date = useMemo(() => {
    const parsedDate = parse(datePath, 'yyyy-MM', now);
    return isValid(parsedDate) ? parsedDate : now;
  }, [datePath]);

  return [date, datePath];
};
