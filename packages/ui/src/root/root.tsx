import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Switch } from 'react-router-dom';
import { appMessages } from '../app.messages';
import { useSwitchTheme } from '../design-system';
import { useDateParam } from '../hooks/use-date-param';
import { Locale, useFormatDate, useLocale, useSetLocale } from '../i18n';
import { Games } from '../screens/games/lazy';
import { Movies } from '../screens/movies/lazy';
import { Tvs } from '../screens/tvs/lazy';
import { Anchor, ExternalAnchor } from '../shared/anchor';
import { Box } from '../shared/box';
import { Footer, Header, Main, Page } from './layout';
import { Lang, LangPicker } from './layout/lang-picker';
import { Logo } from './layout/logo';
import { MonthMenu } from './month-menu';
import { SiteMenu } from './site-menu';

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
        </Switch>
      </Main>
      <Footer>
        <Box>© {formatDate(now, 'yyyy')}</Box>
        <Box mx={2}>
          <Anchor href="mailto:ready.steady.release@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} />{' '}
            {formatMessage(appMessages.contactMe)}
          </Anchor>
        </Box>
        <Box>
          {formatMessage(appMessages.poweredBy, {
            /* eslint-disable react/display-name */
            link1: value => (
              <ExternalAnchor href="https://rawg.io/">{value}</ExternalAnchor>
            ),
            link2: value => (
              <ExternalAnchor href="https://www.themoviedb.org/">
                {value}
              </ExternalAnchor>
            )
            /* eslint-enable react/display-name */
          })}
        </Box>
        <LangPicker>
          <Lang active={locale === Locale.en} onClick={setEn}>
            EN
          </Lang>
          <Lang active={locale === Locale.ru} onClick={setRu}>
            РУ
          </Lang>
        </LangPicker>
      </Footer>
    </Page>
  );
};
