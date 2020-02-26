import styled, { css } from 'styled-components';
import { box, theme, Size, ifNotProp, ifProp } from '../../../design-system';
import { DayItemList } from './day-item-list';
import { up } from 'styled-breakpoints';

export const DayIndicator = styled.div<{
  today?: boolean;
  sameMonth?: boolean;
}>`
  ${box};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  min-height: 30px;
  padding-left: ${theme(t => t.space[1])};
  padding-right: ${theme(t => t.space[1])};
  font-size: 0.9rem;
  font-weight: bold;
  line-height: 29px;
  z-index: 10;
  background-color: ${theme(t => t.colors.secondary.normal)};
  color: ${theme(t => t.colors.text.secondary)};
  box-shadow: ${theme(t => t.shadows.normal)};
  border: 1px solid;
  border-color: ${theme(t => t.colors.text.secondary)};
  border-radius: ${theme(t => t.radii.double)};

  ${ifNotProp(
    'sameMonth',
    css`
      background-color: ${theme(t => t.colors.primary.minor)};
      color: ${theme(t => t.colors.text.primary)};
      opacity: 0.2;
    `
  )}

  ${ifProp(
    'today',
    css`
      background-color: ${theme(t => t.colors.card.inverted)};
      color: ${theme(t => t.colors.text.inverted)};
      border-color: ${theme(t => t.colors.text.inverted)};
    `
  )}
`;

export const DayWeek = styled.div<{ today?: boolean }>`
  ${box};
  display: inline-block;
  font-size: 0.8rem;
  font-weight: normal;

  ${up(Size.lg)} {
    display: none;
  }
`;

export const DaySchedule = styled.div`
  ${DayIndicator} {
    margin-left: ${theme(t => t.space[3])};
    margin-top: ${theme(t => t.space[3])};
  }

  ${DayItemList} {
    margin-top: calc(-1 * ${theme(t => t.space[5])} - 30px);
  }
`;
