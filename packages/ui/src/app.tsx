import { StoreProvider } from 'easy-peasy';
import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Globals } from './design-system';
import { I18nProvider } from './i18n';
import { Root } from './root';
import { store } from './store';
import { ThemeProvider } from './theme';
import { ModalProvider } from 'react-modal-hook';

export const App: FC = () => {
  return (
    <StoreProvider store={store}>
      <I18nProvider>
        <ThemeProvider>
          <ModalProvider>
            <Globals />
            <BrowserRouter>
              <Root />
            </BrowserRouter>
          </ModalProvider>
        </ThemeProvider>
      </I18nProvider>
    </StoreProvider>
  );
};
