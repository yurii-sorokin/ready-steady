import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { appMessages } from '../app.messages';
import { useSwitchTheme } from '../design-system';
import { useMonthNav } from '../hooks/use-month-nav';
import { Locale, useFormatDate, useLocale, useSetLocale } from '../i18n';
import { Games } from '../screens/games';
import { Movies } from '../screens/movies';
import { Tvs } from '../screens/tvs';
import { ExternalLink } from '../shared/link';
import { Footer, Header, Main, Page } from './layout';
import { Attribution } from './layout/attribution';
import { Copyright } from './layout/copyright';
import { Lang, LangPicker } from './layout/lang-picker';
import { Logo } from './layout/logo';
import { MonthMenu } from './month-menu';
import { SiteMenu } from './site-menu';
import { useDateParam } from '../hooks/use-date-param';

const now = new Date();

export const Root = () => {
  const { formatMessage } = useIntl();
  const locale = useLocale();
  const setEn = useSetLocale(Locale.en);
  const setRu = useSetLocale(Locale.ru);
  const formatDate = useFormatDate();
  const switchTheme = useSwitchTheme();
  const [date] = useDateParam();

  return (
    <Page>
      <Header>
        <Logo onClick={switchTheme}>
          <span>Ready</span>
          <span>Steady</span>
          <span>Release</span>
        </Logo>
        <MonthMenu />
        <SiteMenu />
      </Header>
      <Main>
        <Switch>
          <Route path="/tvs/:date">
            <Tvs date={date} />
          </Route>
          <Route path="/movies/:date">
            <Movies date={date} />
          </Route>
          <Route path="/games/:date">
            <Games date={date} />
          </Route>
          <Redirect to="/games" />
        </Switch>
      </Main>
      <Footer>
        <Copyright>© {formatDate(now, 'yyyy')}</Copyright>
        <Attribution>
          {formatMessage(appMessages.poweredBy, {
            /* eslint-disable react/display-name */
            link1: value => (
              <ExternalLink href="https://rawg.io/">{value}</ExternalLink>
            ),
            link2: value => (
              <ExternalLink href="https://www.themoviedb.org/">
                {value}
              </ExternalLink>
            )
            /* eslint-enable react/display-name */
          })}
        </Attribution>
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
