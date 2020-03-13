import getDate from 'date-fns/getDate';
import isSameMonth from 'date-fns/isSameMonth';
import isToday from 'date-fns/isToday';
import React, { ReactElement, useMemo, memo } from 'react';
import { Subscription } from '../../firebase/store';
import { useGroupByDate } from '../../hooks/use-group-by-date';
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

export interface CalendarProps<T extends { id: string | number }> {
  data: T[];
  date: Date;
  groupBy: keyof T;
  subscriptions: Subscription[];
  maxColumnCount: number;
  bgUrl?: string | null;
  render: (
    item: T,
    meta: { subscription?: Subscription; index: number }
  ) => ReactElement;
}

export const useWeekNames = (weekDays: Date[]) => {
  const formatDate = useFormatDate();

  return useMemo(() => weekDays.map(weekDay => formatDate(weekDay, 'EEEEEE')), [
    formatDate,
    weekDays
  ]);
};

const typedMemo: <T>(fn: T) => T = memo;

export const Calendar = typedMemo(
  <T extends { id: string | number }>({
    date,
    data,
    groupBy,
    subscriptions,
    bgUrl,
    maxColumnCount,
    render
  }: CalendarProps<T>) => {
    const monthCalendar = useMonthCalendar({ date });
    const weekDayNames = useWeekNames(monthCalendar[0]);
    const dataGroupedByDay = useGroupByDate(data, groupBy);
    const { columnSizes, totalSize } = useColumnSizes(
      date,
      monthCalendar,
      dataGroupedByDay,
      maxColumnCount
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
            {monthCalendar.map((week, i) => (
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
                            dayItems.map(item => {
                              const subscription = subscriptions.find(
                                ({ id }) => id === String(item.id)
                              );
                              const index = data.findIndex(
                                ({ id }) => id === item.id
                              );

                              return (
                                <DayItem
                                  key={item.id}
                                  width={`${100 / columnSizes[i]}%`}
                                >
                                  {render(item, { subscription, index })}
                                </DayItem>
                              );
                            })
                          ) : (
                            <DayItem>
                              <EmptyCard index={-1} />
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
                          <EmptyCard index={-1} />
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
  }
);
