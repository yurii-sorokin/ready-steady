import styled from 'styled-components';
import { theme } from '../../../../design-system';
import { FlagIcon } from '../../../icon/flag';
import { NetworkIcon } from '../../../icon/network';
import { PlatformIcon } from '../../../icon/platform';

export const IconList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${theme(t => t.space[1])};

  ${FlagIcon}, ${PlatformIcon}, ${NetworkIcon} {
    margin: 3px;
  }
`;
