import getDate from 'date-fns/getDate';
import isSameMonth from 'date-fns/isSameMonth';
import { useMemo } from 'react';

export const getOptimalCount = (
  count: number,
  { maxCount }: { maxCount: number }
) => {
  let optimalCount = maxCount;
  while (count % optimalCount <= optimalCount / 2 && optimalCount > 1) {
    optimalCount--;
  }

  let exactCount = Math.min(count - 1, maxCount);
  while (count % exactCount !== 0 && exactCount > 1) {
    exactCount--;
  }

  if (exactCount <= 1) {
    return count < maxCount ? count : optimalCount;
  }

  return exactCount;
};

export const useColumnSizes = <T extends unknown>(
  date: Date,
  matrix: Date[][],
  dataGroupedByDay: { [key: string]: T[] },
  maxColumnCount: number
) => {
  return useMemo(() => {
    const sizes = matrix.map(week =>
      week.map(day => {
        const dayItems = isSameMonth(date, day)
          ? dataGroupedByDay[getDate(day)]
          : null;

        return dayItems
          ? getOptimalCount(dayItems.length, { maxCount: maxColumnCount })
          : 0;
      })
    );

    const columnSizes = matrix[0].map((_, i) =>
      Math.max(...sizes.map(w => w[i]))
    );
    const totalSize = columnSizes.reduce((r, s) => r + s, 0);

    return { columnSizes, totalSize };
  }, [dataGroupedByDay, date, matrix, maxColumnCount]);
};
