import { faFilm } from '@fortawesome/free-solid-svg-icons/faFilm';
import { faGamepad } from '@fortawesome/free-solid-svg-icons/faGamepad';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons/faLongArrowAltRight';
import { faTv } from '@fortawesome/free-solid-svg-icons/faTv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useKey from '@rooks/use-key';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { Redirect, Route, Switch } from 'react-router-dom';
import { appMessages } from '../app.messages';
import { useSwitchTheme } from '../design-system';
import { Games } from '../games';
import { Locale, useFormatDate, useLocale, useSetLocale } from '../i18n';
import { Movies } from '../movies';
import { Tvs } from '../tvs';
import { Footer, Header, Logo, Main, Page } from './layout';
import { Lang, LangPicker } from './layout/lang-picker';
import {
  MonthDate,
  MonthDateShort,
  MonthNav,
  MonthNavButton,
  SiteItem,
  SiteLink,
  SiteList,
  SiteNav,
  SiteText
} from './layout/nav';

const now = new Date();

const useMonthNav = (now: Date): [Date, () => void, () => void] => {
  const [date, setDate] = useState(now);
  const prevMonth = useCallback(() => setDate(subMonths(date, 1)), [date]);
  const nextMonth = useCallback(() => setDate(addMonths(date, 1)), [date]);

  return [date, prevMonth, nextMonth];
};

export const Root = () => {
  const locale = useLocale();
  const setEn = useSetLocale(Locale.en);
  const setRu = useSetLocale(Locale.ru);
  const formatDate = useFormatDate();
  const switchTheme = useSwitchTheme();
  const [date, prevMonth, nextMonth] = useMonthNav(now);
  const { formatMessage } = useIntl();

  useKey(['ArrowLeft'], prevMonth);
  useKey(['ArrowRight'], nextMonth);

  return (
    <Page>
      <Header>
        <Logo onClick={switchTheme}>
          <span>Ready</span>
          <span>Steady</span>
          <span>Release</span>
        </Logo>
        <MonthNav>
          <MonthNavButton onClick={prevMonth}>
            <FontAwesomeIcon size="xs" icon={faLongArrowAltLeft} />
          </MonthNavButton>
          <MonthDate>{formatDate(date, 'LLLL yyyy')}</MonthDate>
          <MonthDateShort>{formatDate(date, 'LLL yyyy')}</MonthDateShort>
          <MonthNavButton onClick={nextMonth}>
            <FontAwesomeIcon size="xs" icon={faLongArrowAltRight} />
          </MonthNavButton>
        </MonthNav>
        <SiteNav>
          <SiteList>
            <SiteItem>
              <SiteLink to="/games">
                <FontAwesomeIcon icon={faGamepad} />{' '}
                <SiteText>{formatMessage(appMessages.games)}</SiteText>
              </SiteLink>
            </SiteItem>
            <SiteItem>
              <SiteLink to="/movies">
                <FontAwesomeIcon icon={faFilm} />{' '}
                <SiteText>{formatMessage(appMessages.movies)}</SiteText>
              </SiteLink>
            </SiteItem>
            <SiteItem>
              <SiteLink to="/tvs">
                <FontAwesomeIcon icon={faTv} />{' '}
                <SiteText>{formatMessage(appMessages.tvs)}</SiteText>
              </SiteLink>
            </SiteItem>
          </SiteList>
        </SiteNav>
      </Header>
      <Main>
        <Switch>
          <Route path="/tvs">
            <Tvs date={date} />
          </Route>
          <Route path="/movies">
            <Movies date={date} />
          </Route>
          <Route path="/games">
            <Games date={date} />
          </Route>
          <Redirect to="/games" />
        </Switch>
      </Main>
      <Footer>
        © {formatDate(now, 'yyyy')}
        <LangPicker>
          <Lang active={locale === Locale.en} onClick={setEn}>
            eng
          </Lang>
          <Lang active={locale === Locale.ru} onClick={setRu}>
            рус
          </Lang>
        </LangPicker>
      </Footer>
    </Page>
  );
};
