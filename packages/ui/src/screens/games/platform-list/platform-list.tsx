import React, { FC, memo } from 'react';
import styled from 'styled-components';
import { Platform } from '../../../api/rawg/types';
import { IconList } from '../../../shared/card/details/icon-list';
import { PlatformIcon } from '../../../shared/icon/platform';

export const PlatformListUnstyled: FC<{ platforms: Platform[] }> = memo(
  ({ platforms, ...props }) => (
    <IconList {...props}>
      {(platforms || []).map(({ platform: { slug } }) => (
        <PlatformIcon key={slug} slug={slug} />
      ))}
    </IconList>
  )
);

export const PlatformList = styled(PlatformListUnstyled)``;
