import { StoreProvider } from 'easy-peasy';
import React, { FC, useMemo } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Globals } from './design-system';
import { I18nProvider } from './i18n';
import { Root } from './root';
import { store } from './store';
import { ThemeProvider } from './theme';
import { ModalProvider } from 'react-modal-hook';
import format from 'date-fns/format';

const now = new Date();

export const App: FC = () => {
  const nowPath = useMemo(() => format(now, 'yyyy-MM'), []);

  return (
    <StoreProvider store={store}>
      <I18nProvider>
        <ThemeProvider>
          <ModalProvider>
            <Globals />
            <BrowserRouter>
              <Switch>
                <Redirect
                  exact
                  from="/:type(games|movies|tvs)"
                  to={`/:type/${nowPath}`}
                />
                <Route path="/:type(games|movies|tvs)?/:date?">
                  <Root />
                </Route>
              </Switch>
            </BrowserRouter>
          </ModalProvider>
        </ThemeProvider>
      </I18nProvider>
    </StoreProvider>
  );
};
