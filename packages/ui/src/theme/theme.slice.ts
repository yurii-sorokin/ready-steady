import { action, Action } from 'easy-peasy';
import { darkTheme, lightTheme, Theme } from './theme';

export enum ThemeType {
  dark = 'dark',
  light = 'light'
}

const themeDictionary = {
  [ThemeType.dark]: darkTheme,
  [ThemeType.light]: lightTheme
};

export interface ThemeState {
  themeType: ThemeType;
  theme: Theme;
}

export interface ThemeModel extends ThemeState {
  setTheme: Action<ThemeState, ThemeType>;
  switchTheme: Action<ThemeState, never>;
}

const defaultThemeType = ThemeType.dark;

export const themeSlice: ThemeModel = {
  themeType: defaultThemeType,
  theme: themeDictionary[defaultThemeType],

  setTheme: action((state, payload) => {
    state.themeType = payload;
    state.theme = themeDictionary[payload];
  }),

  switchTheme: action(state => {
    const themeType =
      state.themeType === ThemeType.dark ? ThemeType.light : ThemeType.dark;

    state.themeType = themeType;
    state.theme = themeDictionary[themeType];
  })
};
