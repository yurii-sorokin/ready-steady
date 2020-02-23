import React, { FC } from 'react';
import { useTheme } from './theme.hooks';
import { ThemeProvider as Provider } from 'styled-components';

export const ThemeProvider: FC = ({ children }) => {
  const theme = useTheme();
  return <Provider theme={theme}>{children}</Provider>;
};
