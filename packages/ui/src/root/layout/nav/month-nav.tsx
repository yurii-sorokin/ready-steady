import styled from 'styled-components';
import { box, resetButton, Size, theme } from '../../../design-system';
import { up } from 'styled-breakpoints';

export const MonthNav = styled.nav`
  ${box}
  display: flex;
  align-items: center;
  justify-content: center;
  order: 2;
  font-size: 1rem;
  padding: ${theme(t => t.space[1])} ${theme(t => t.space[2])};

  ${up(Size.sm)} {
    font-size: 1.4rem;
    order: 1;
    flex: 1;
  }
`;

export const MonthNavButton = styled.button`
  ${box}
  ${resetButton}
  padding-left: ${theme(t => t.space[2])};
  padding-right: ${theme(t => t.space[2])};
`;

export const MonthDateShort = styled.div`
  text-transform: capitalize;
  text-align: center;

  ${up(Size.md)} {
    display: none;
  }
`;

export const MonthDate = styled(MonthDateShort)`
  ${box}
  display: none;

  ${up(Size.md)} {
    display: block;
  }
`;
