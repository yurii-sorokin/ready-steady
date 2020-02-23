import rgba from 'polished/lib/color/rgba';
import { up } from 'styled-breakpoints';
import styled from 'styled-components';
import { box, Size, theme } from '../../design-system';
import { DayIndicator } from '../../shared/calendar/day';
import { Th } from '../../shared/table';

export const Header = styled.header`
  ${box}
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: ${theme(t => t.space[2])};
  background-color: ${theme(t => rgba(t.colors.primary.normal, 0.95))};
  color: ${theme(t => t.colors.text.primary)};
  box-shadow: ${theme(t => t.shadows.normal)};

  ${up(Size.lg)} {
    padding-left: ${theme(t => t.space[4])};
    padding-right: ${theme(t => t.space[4])};
  }
`;

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

export const Footer = styled.footer`
  ${box}
  display: flex;
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
    top: 65px;
    left: 0;
    z-index: 15;
  }

  ${DayIndicator} {
    position: sticky;
    top: 65px;
    left: ${theme(t => t.space[1])};
    z-index: 10;

    ${up(Size.lg)} {
      top: 105px;
    }
  }
`;
