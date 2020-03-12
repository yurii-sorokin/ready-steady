import { action, Action, persist, computed, Computed } from 'easy-peasy';
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
  theme: Computed<ThemeState, Theme>;
}

export interface ThemeModel extends ThemeState {
  setTheme: Action<ThemeState, ThemeType>;
  switchTheme: Action<ThemeState, never>;
}

const defaultThemeType = ThemeType.dark;

const themes = [ThemeType.dark, ThemeType.light];

export const themeSlice: ThemeModel = persist(
  {
    themeType: defaultThemeType,
    theme: computed(
      ({ themeType }) =>
        themeDictionary[themeType] || themeDictionary[defaultThemeType]
    ),

    setTheme: action((state, payload) => {
      state.themeType = payload;
    }),

    switchTheme: action(state => {
      const index = themes.indexOf(state.themeType);
      const themeType =
        index === -1 || index === themes.length - 1
          ? themes[0]
          : themes[index + 1];

      state.themeType = themeType;
    })
  },
  {
    whitelist: ['themeType']
  }
);
