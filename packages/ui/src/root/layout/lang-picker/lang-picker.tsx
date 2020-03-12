import styled, { css } from 'styled-components';
import { theme, ifProp } from '../../../design-system';

export const LangPicker = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const Lang = styled.a<{ active?: boolean }>`
  padding-left: ${theme(t => t.space[1])};
  padding-right: ${theme(t => t.space[1])};
  color: ${theme(t => t.colors.text.disabled)};
  text-decoration: none;
  cursor: pointer;

  ${ifProp(
    'active',
    css`
      cursor: default;
      color: ${theme(t => t.colors.text.primary)};
    `
  )};
`;
