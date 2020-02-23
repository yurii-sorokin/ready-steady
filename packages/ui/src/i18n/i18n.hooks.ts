import { useCallback } from 'react';
import { useStoreActions, useStoreState } from '../store.hooks';
import { Locale } from './i18n.slice';

export const useLocale = () => useStoreState(({ i18n }) => i18n.locale);

export const useMessages = () => useStoreState(({ i18n }) => i18n.messages);

export const useFormatDate = () => useStoreState(({ i18n }) => i18n.formatDate);

export const useSetLocale = (locale: Locale) => {
  const setLocale = useStoreActions(({ i18n }) => i18n.setLocale);

  return useCallback(() => setLocale(locale), [locale, setLocale]);
};
