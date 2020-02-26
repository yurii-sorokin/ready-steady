import getDate from 'date-fns/getDate';
import isSameMonth from 'date-fns/isSameMonth';
import isToday from 'date-fns/isToday';
import React, { ReactElement, useMemo } from 'react';
import { useFormatDate } from '../../i18n';
import { Bg } from '../bg';
import { EmptyCard } from '../card';
import { Table, TBody, Td, Th, THead, Tr } from '../table';
import {
  DayIndicator,
  DayItem,
  DayItemList,
  DaySchedule,
  DayWeek
} from './day';
import { useColumnSizes } from './use-column-sizes';
import { useMonthCalendar } from './use-month-calendar';

interface CalendarProps<T extends { id: string | number }> {
  date: Date;
  dataGroupedByDay: { [key: string]: T[] };
  maxColumnCount: number;
  bgUrl?: string | null;
  render: (item: T) => ReactElement;
}

export const Calendar = <T extends { id: string | number }>({
  date,
  dataGroupedByDay,
  bgUrl,
  maxColumnCount,
  render
}: CalendarProps<T>) => {
  const formatDate = useFormatDate();
  const matrix = useMonthCalendar({ date });
  const { columnSizes, totalSize } = useColumnSizes(
    date,
    matrix,
    dataGroupedByDay,
    maxColumnCount
  );
  const weekDayNames = useMemo(
    () => matrix[0].map(weekDay => formatDate(weekDay, 'EEEEEE')),
    [formatDate, matrix]
  );

  return (
    <DaySchedule>
      <Bg src={bgUrl} />
      <Table>
        <THead>
          <Tr>
            {weekDayNames.map((weekDayName, i) => (
              <Th
                key={weekDayName}
                width={`${(columnSizes[i] / totalSize) * 100}%`}
              >
                {weekDayName}
              </Th>
            ))}
          </Tr>
        </THead>
        <TBody>
          {matrix.map((week, i) => (
            <Tr key={i}>
              {week.map(day => {
                const sameMonth = isSameMonth(date, day);
                const dayNumber = getDate(day);

                if (sameMonth) {
                  const dayItems = dataGroupedByDay[dayNumber];
                  const today = isToday(day);

                  return (
                    <Td key={+day} empty={!dayItems}>
                      <DayIndicator today={today} sameMonth={sameMonth}>
                        {dayNumber}
                        <DayWeek>&nbsp;/&nbsp;{weekDayNames[i]}</DayWeek>
                      </DayIndicator>
                      <DayItemList>
                        {dayItems ? (
                          dayItems.map(item => (
                            <DayItem
                              key={item.id}
                              width={`${100 / columnSizes[i]}%`}
                            >
                              {render(item)}
                            </DayItem>
                          ))
                        ) : (
                          <DayItem>
                            <EmptyCard />
                          </DayItem>
                        )}
                      </DayItemList>
                    </Td>
                  );
                }

                return (
                  <Td key={+day} empty>
                    <DayIndicator>
                      {dayNumber}
                      <DayWeek>&nbsp;/&nbsp;{weekDayNames[i]}</DayWeek>
                    </DayIndicator>
                    <DayItemList>
                      <DayItem>
                        <EmptyCard />
                      </DayItem>
                    </DayItemList>
                  </Td>
                );
              })}
            </Tr>
          ))}
        </TBody>
      </Table>
    </DaySchedule>
  );
};
