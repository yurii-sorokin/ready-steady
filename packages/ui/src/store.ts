import { createStore } from 'easy-peasy';
import { i18nSlice, I18nModel } from './i18n';
import { themeSlice, ThemeModel } from './theme';

export interface StoreModel {
  i18n: I18nModel;
  theme: ThemeModel;
}

export const store = createStore({
  i18n: i18nSlice,
  theme: themeSlice
});
