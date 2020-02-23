import React, { FC } from 'react';
import { IconList } from '../../shared/card/details/icon-list';
import { PlatformIcon } from '../../shared/icon/platform';
import { Platform } from '../../api/games';

export const PlatformList: FC<{ platforms: Platform[] }> = ({ platforms }) => (
  <IconList>
    {(platforms || []).map(({ platform: { slug } }) => (
      <PlatformIcon key={slug} slug={slug} />
    ))}
  </IconList>
);
