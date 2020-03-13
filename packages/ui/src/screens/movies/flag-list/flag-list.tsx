/* eslint-disable @typescript-eslint/camelcase */
import React, { FC, memo } from 'react';
import styled from 'styled-components';
import { Country } from '../../../api/tmdb/types';
import { IconList } from '../../../shared/card/details/icon-list';
import { FlagIcon } from '../../../shared/icon/flag';

export const FlagListUnstyled: FC<{ countries: Country[] }> = memo(
  ({ countries, ...props }) => (
    <IconList {...props}>
      {(countries || []).map(({ iso_3166_1 }) => (
        <FlagIcon key={iso_3166_1} code={iso_3166_1.toLowerCase()} />
      ))}
    </IconList>
  )
);

export const FlagList = styled(FlagListUnstyled)``;
