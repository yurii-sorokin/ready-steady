import { createGlobalStyle } from 'styled-components';
import normalize from 'polished/lib/mixins/normalize';
import { theme } from './tools';

export const Globals = createGlobalStyle`
  ${normalize()};

  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${theme(t => t.colors.primary.minor)};
  }

  a {
    display: inline-block;
    color: ${theme(t => t.colors.secondary.normal)};
    text-decoration: none;
  }
`;
