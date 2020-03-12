import format from 'date-fns/format';
import { StoreProvider } from 'easy-peasy';
import React, { FC, useMemo } from 'react';
import { ModalProvider } from 'react-modal-hook';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Globals } from './design-system';
import { I18nProvider } from './i18n';
import { Notifications } from './notifications';
import { Root } from './root';
import { SignIn } from './screens/signin/lazy';
import { SignUp } from './screens/signup/lazy';
import { store } from './store';
import { ThemeProvider } from './theme';

const today = new Date();

export const App: FC = () => {
  const nowPath = useMemo(() => format(today, 'yyyy-MM'), []);

  return (
    <StoreProvider store={store}>
      <I18nProvider>
        <ThemeProvider>
          <ModalProvider>
            <Globals />
            <Notifications />
            <BrowserRouter>
              <Switch>
                <Route exact path="/:type(games|movies|tvs)/:date">
                  <Root />
                </Route>
                <Route path="/sign-in">
                  <SignIn />
                </Route>
                <Route path="/sign-up">
                  <SignUp />
                </Route>
                <Redirect exact from="/" to={`/games/${nowPath}`} />
                <Redirect exact from="/games" to={`/games/${nowPath}`} />
                <Redirect exact from="/movies" to={`/movies/${nowPath}`} />
                <Redirect exact from="/tvs" to={`/tvs/${nowPath}`} />
                <Redirect to="/" />
              </Switch>
            </BrowserRouter>
          </ModalProvider>
        </ThemeProvider>
      </I18nProvider>
    </StoreProvider>
  );
};
