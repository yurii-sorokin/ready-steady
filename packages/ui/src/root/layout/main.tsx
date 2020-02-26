import { up } from 'styled-breakpoints';
import styled from 'styled-components';
import { box, Size, theme } from '../../design-system';

export const Main = styled.main`
  ${box}
  flex: 1;
  padding: ${theme(t => t.space[2])} ${theme(t => t.space[1])};
  position: relative;

  ${up(Size.md)} {
    padding: ${theme(t => t.space[2])};
  }

  ${up(Size.lg)} {
    padding: ${theme(t => t.space[4])};
  }
`;
