/* eslint-disable @typescript-eslint/camelcase */
import React, { FC } from 'react';
import { IconList } from '../../shared/card/details/icon-list';
import { FlagIcon } from '../../shared/icon/flag';
import { ProductionCountry } from '../../api/movies';

export const FlagList: FC<{ countries: ProductionCountry[] }> = ({
  countries
}) => (
  <IconList>
    {(countries || []).map(({ iso_3166_1 }) => (
      <FlagIcon key={iso_3166_1} code={iso_3166_1.toLowerCase()} />
    ))}
  </IconList>
);
