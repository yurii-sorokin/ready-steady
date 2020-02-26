import { up } from 'styled-breakpoints';
import styled from 'styled-components';
import { box, Size, theme } from '../../design-system';
import { DayIndicator } from '../../shared/calendar/day';
import { Th } from '../../shared/table';
import { Header } from './header';

export const Page = styled.div`
  ${box}
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  ${Header} {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 20;
  }

  ${Th} {
    position: sticky;
    top: 75px;
    left: 0;
    z-index: 15;
  }

  ${DayIndicator} {
    position: sticky;
    top: 75px;
    left: ${theme(t => t.space[1])};
    z-index: 10;

    ${up(Size.lg)} {
      top: 115px;
    }
  }
`;
