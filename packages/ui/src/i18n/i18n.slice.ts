import { action, Action, persist, Computed, computed } from 'easy-peasy';
import enMessages from './translations/en.json';
import ruMessages from './translations/ru.json';
import ru from 'date-fns/locale/ru';
import format from 'date-fns/format';

export enum Locale {
  en = 'en-US',
  ru = 'ru-RU'
}

const i18nDictionary = {
  [Locale.en]: enMessages,
  [Locale.ru]: ruMessages
};

const formatDictionary = {
  [Locale.en]: undefined,
  [Locale.ru]: ru
};

export interface I18nState {
  locale: Locale;
  messages: Computed<I18nState, Record<string, string>>;
  formatDate: Computed<I18nState, (date: Date, format: string) => string>;
}

export interface I18nModel extends I18nState {
  setLocale: Action<I18nState, Locale>;
}

const defaultLocale = Locale.ru;

const createFormat = (locale: Locale) => (date: Date, formatString: string) =>
  format(date, formatString, { locale: formatDictionary[locale] });

export const i18nSlice: I18nModel = persist(
  {
    locale: defaultLocale,
    messages: computed(({ locale }) => i18nDictionary[locale]),
    formatDate: computed(({ locale }) => createFormat(locale)),

    setLocale: action((state, payload) => {
      state.locale = payload;
      state.messages = i18nDictionary[payload];
      state.formatDate = createFormat(payload);
    })
  },
  {
    whitelist: ['locale']
  }
);
