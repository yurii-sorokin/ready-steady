import styled from 'styled-components';
import { box, theme } from '../../../design-system';
import { Img } from '../../img';

export const NetworkIcon = styled(Img)`
  ${box}
  display: inline-block;
  height: 24px;
  margin: 3px;
  border-radius: ${theme(t => t.radii.small)};
  border: 1px solid;
  border-color: ${theme(t => t.colors.border.normal)};
  background-color: ${theme(t => t.colors.card.inverted)};
`;
