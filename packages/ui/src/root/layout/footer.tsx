import rgba from 'polished/lib/color/rgba';
import { up } from 'styled-breakpoints';
import styled from 'styled-components';
import { box, Size, theme } from '../../design-system';

export const Footer = styled.footer`
  ${box}
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: ${theme(t => t.space[2])};
  background-color: ${theme(t => rgba(t.colors.primary.normal, 0.95))};
  color: ${theme(t => t.colors.text.primary)};
  box-shadow: ${theme(t => t.shadows.normal)};

  ${up(Size.lg)} {
    padding-left: ${theme(t => t.space[4])};
    padding-right: ${theme(t => t.space[4])};
  }
`;
