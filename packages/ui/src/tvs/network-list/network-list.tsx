/* eslint-disable @typescript-eslint/camelcase */
import React, { FC } from 'react';
import { Network } from '../../api/tvs';
import { IconList } from '../../shared/card/details/icon-list';
import { NetworkIcon } from '../../shared/icon/network';

export const NetworkList: FC<{ networks: Network[] }> = ({ networks }) => (
  <IconList>
    {(networks || []).map(({ logo_path }) => (
      <NetworkIcon key={logo_path} src={logo_path} />
    ))}
  </IconList>
);
