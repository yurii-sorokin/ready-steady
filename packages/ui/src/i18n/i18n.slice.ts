import { action, Action } from 'easy-peasy';
import enMessages from './translations/en.json';
import ruMessages from './translations/ru.json';
import ru from 'date-fns/locale/ru';
import format from 'date-fns/format';

export enum Locale {
  en = 'en',
  ru = 'ru'
}

const i18nDictionary = {
  en: enMessages,
  ru: ruMessages
};

const formatDictionary = {
  en: undefined,
  ru
};

export interface I18nState {
  locale: Locale;
  messages: Record<string, string>;
  formatDate: (date: Date, format: string) => string;
}

export interface I18nModel extends I18nState {
  setLocale: Action<I18nState, Locale>;
}

const defaultLocale = Locale.ru;

const createFormat = (locale: Locale) => (date: Date, formatString: string) =>
  format(date, formatString, { locale: formatDictionary[locale] });

export const i18nSlice: I18nModel = {
  locale: defaultLocale,
  messages: i18nDictionary[defaultLocale],
  formatDate: createFormat(defaultLocale),

  setLocale: action((state, payload) => {
    state.locale = payload;
    state.messages = i18nDictionary[payload];
    state.formatDate = createFormat(payload);
  })
};
