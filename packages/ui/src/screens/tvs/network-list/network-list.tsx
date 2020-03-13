/* eslint-disable @typescript-eslint/camelcase */
import React, { FC, memo } from 'react';
import styled from 'styled-components';
import { Network } from '../../../api/tmdb/types';
import { IconList } from '../../../shared/card/details/icon-list';
import { NetworkIcon } from '../../../shared/icon/network';

export const NetworkListUnstyled: FC<{ networks: Network[] }> = memo(
  ({ networks, ...props }) => (
    <IconList {...props}>
      {(networks || []).map(({ name, logo_path }) => (
        <NetworkIcon alt={name} key={logo_path} src={logo_path} />
      ))}
    </IconList>
  )
);

export const NetworkList = styled(NetworkListUnstyled)``;
