import styled from 'styled-components';
import { box, Size, theme } from '../../design-system';
import { up } from 'styled-breakpoints';
import rgba from 'polished/lib/color/rgba';

export const Table = styled.table`
  ${box};
  display: block;
  width: 100%;

  ${up(Size.lg)} {
    display: table;
    border-collapse: collapse;
  }
`;

export const TBody = styled.tbody`
  ${box};
  display: flex;
  flex-direction: column;

  ${up(Size.lg)} {
    display: table-row-group;
  }
`;

export const THead = styled.thead`
  ${box};
  display: none;

  ${up(Size.lg)} {
    display: table-header-group;
  }
`;

export const Th = styled.th<{ width?: string }>`
  ${box};
  background-color: ${theme(t => t.colors.card.normal)};
  color: ${theme(t => t.colors.text.primary)};
  padding: ${theme(t => t.space[2])};
  text-transform: uppercase;
  width: ${p => p.width};

  ${up(Size.lg)} {
    border-left: 1px solid;
    border-right: 1px solid;
    border-color: ${theme(t => t.colors.border.normal)};

    &:first-child {
      border-left: 0;
      border-top-left-radius: ${theme(t => t.radii.small)};
    }

    &:last-child {
      border-right: 0;
      border-top-right-radius: ${theme(t => t.radii.small)};
    }
  }
`;

export const Td = styled.td<{ empty?: boolean }>`
  ${box};
  display: ${p => (p.empty ? 'none' : 'block')};
  flex: 1;
  position: relative;
  background-color: ${theme(t => rgba(t.colors.card.inverted, 0.3))};
  border: 1px solid;
  border-color: ${theme(t => rgba(t.colors.card.inverted, 0.6))};
  border-radius: ${theme(t => t.radii.normal)};
  margin-bottom: ${theme(t => t.space[2])};

  ${up(Size.lg)} {
    display: table-cell;
    vertical-align: top;

    &:first-child {
      border-left: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:last-child {
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;

export const Tr = styled.tr`
  ${box};
  display: flex;
  flex-direction: column;
  flex: 1;

  &:last-child {
    margin-bottom: -${theme(t => t.space[2])};
  }

  ${up(Size.lg)} {
    display: table-row;

    &:last-child {
      margin-bottom: 0;

      ${Td} {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom: 0;

        &:first-child {
          border-bottom-left-radius: ${theme(t => t.radii.small)};
        }

        &:last-child {
          border-bottom-right-radius: ${theme(t => t.radii.small)};
        }
      }
    }
  }
`;
