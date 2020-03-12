import styled from 'styled-components';
import {
  box,
  resetButton,
  system,
  SystemProps,
  theme
} from '../../design-system';

export const Anchor = styled.a<SystemProps>`
  ${box}
  ${resetButton}
  outline: none;
  display: inline-block;
  color: ${theme(t => t.colors.secondary.normal)};
  cursor: pointer;
  text-decoration: none;
  ${system}
`;

export const ExternalAnchor = styled(Anchor).attrs({
  rel: 'noopener noreferrer',
  target: '_blank'
})``;
