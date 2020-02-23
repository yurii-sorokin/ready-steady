import React, { FC, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { useLocale, useMessages } from './i18n.hooks';

export interface I18nProviderProps {
  children?: ReactNode;
}

export const I18nProvider: FC<I18nProviderProps> = ({
  children
}: I18nProviderProps) => {
  const locale = useLocale();
  const messages = useMessages();

  return (
    <IntlProvider locale={locale} key={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};
