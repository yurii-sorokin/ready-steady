import styled from 'styled-components';
import { box, Size, theme } from '../../../../design-system';
import { up } from 'styled-breakpoints';

export const DayItemList = styled.div`
  ${box};
  display: flex;
  flex-wrap: wrap;
  margin-left: -${theme(t => t.space[1])};
  margin-right: -${theme(t => t.space[1])};
  padding: ${theme(t => t.space[3])} ${theme(t => t.space[2])}
    ${theme(t => t.space[1])};

  ${up(Size.lg)} {
    display: block;
    overflow: hidden;
  }
`;

export const DayItem = styled.div<{ width?: string }>`
  ${box};
  flex: 1;
  flex-basis: 100%;
  padding: ${theme(t => t.space[1])};

  ${up(Size.sm)} {
    flex-basis: 50%;
    max-width: 50%;
  }

  ${up(Size.md)} {
    flex-basis: 33.333333%;
    max-width: 33.333333%;
  }

  ${up(Size.lg)} {
    flex: initial;
    float: left;
    max-width: none;
  }
`;
