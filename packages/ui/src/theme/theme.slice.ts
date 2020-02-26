import { action, Action } from 'easy-peasy';
import { darkTheme, dtfTheme, lightTheme, Theme } from './theme';

export enum ThemeType {
  dark = 'dark',
  light = 'light',
  dtf = 'dtf'
}

const themeDictionary = {
  [ThemeType.dark]: darkTheme,
  [ThemeType.light]: lightTheme,
  [ThemeType.dtf]: dtfTheme
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

const themes = [ThemeType.dark, ThemeType.light, ThemeType.dtf];

export const themeSlice: ThemeModel = {
  themeType: defaultThemeType,
  theme: themeDictionary[defaultThemeType],

  setTheme: action((state, payload) => {
    state.themeType = payload;
    state.theme = themeDictionary[payload];
  }),

  switchTheme: action(state => {
    const theme = themes.shift();
    console.log(themes);
    const themeType = themes[0];

    themes.push(theme!);

    state.themeType = themeType;
    state.theme = themeDictionary[themeType];
  })
};
