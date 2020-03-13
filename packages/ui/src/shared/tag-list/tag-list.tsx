import styled from 'styled-components';
import { box, resetList, theme } from '../../design-system';

export const TagList = styled.ul`
  ${box}
  ${resetList}
  display: flex;
  flex-wrap: wrap;
  font-size: 0.9rem;
  margin-left: -3px;
  margin-right: -3px;
`;

export const Tag = styled.li`
  ${box}
  border: 1px solid;
  border-color: ${theme(t => t.colors.border.normal)};
  color: ${theme(t => t.colors.text.primary)};
  padding: ${theme(t => t.space[1])};
  margin: 3px;
  border-radius: ${theme(t => t.radii.normal)};
`;
