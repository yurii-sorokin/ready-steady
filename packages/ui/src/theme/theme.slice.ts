import { action, Action, persist, computed, Computed } from 'easy-peasy';
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
  theme: Computed<ThemeState, Theme>;
}

export interface ThemeModel extends ThemeState {
  setTheme: Action<ThemeState, ThemeType>;
  switchTheme: Action<ThemeState, never>;
}

const defaultThemeType = ThemeType.dark;

const themes = [ThemeType.dark, ThemeType.light, ThemeType.dtf];

export const themeSlice: ThemeModel = persist(
  {
    themeType: defaultThemeType,
    theme: computed(({ themeType }) => themeDictionary[themeType]),

    setTheme: action((state, payload) => {
      state.themeType = payload;
    }),

    switchTheme: action(state => {
      const index = themes.indexOf(state.themeType);
      const themeType =
        index === themes.length - 1 ? themes[0] : themes[index + 1];

      state.themeType = themeType;
    })
  },
  {
    whitelist: ['themeType']
  }
);
