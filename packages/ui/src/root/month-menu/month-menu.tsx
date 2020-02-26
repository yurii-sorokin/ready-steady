import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons/faLongArrowAltRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useKey from '@rooks/use-key';
import React, { FC } from 'react';
import { useFormatDate } from '../../i18n';
import { MonthDate, MonthDateShort, MonthNav, MonthNavButton } from './nav';

export const MonthMenu: FC<{
  date: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}> = ({ date, onPrevMonth, onNextMonth }) => {
  const formatDate = useFormatDate();

  useKey(['ArrowLeft'], onPrevMonth);
  useKey(['ArrowRight'], onNextMonth);

  return (
    <MonthNav>
      <MonthNavButton onClick={onPrevMonth}>
        <FontAwesomeIcon size="xs" icon={faLongArrowAltLeft} />
      </MonthNavButton>
      <MonthDate>{formatDate(date, 'LLLL yyyy')}</MonthDate>
      <MonthDateShort>{formatDate(date, 'LLL yyyy')}</MonthDateShort>
      <MonthNavButton onClick={onNextMonth}>
        <FontAwesomeIcon size="xs" icon={faLongArrowAltRight} />
      </MonthNavButton>
    </MonthNav>
  );
};
