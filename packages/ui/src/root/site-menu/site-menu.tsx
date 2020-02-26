import { faFilm } from '@fortawesome/free-solid-svg-icons/faFilm';
import { faGamepad } from '@fortawesome/free-solid-svg-icons/faGamepad';
import { faTv } from '@fortawesome/free-solid-svg-icons/faTv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { appMessages } from '../../app.messages';
import { SiteItem, SiteLink, SiteList, SiteNav, SiteText } from './nav';

export const SiteMenu: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <SiteNav>
      <SiteList>
        <SiteItem>
          <SiteLink to="/games">
            <FontAwesomeIcon icon={faGamepad} />{' '}
            <SiteText>{formatMessage(appMessages.games)}</SiteText>
          </SiteLink>
        </SiteItem>
        <SiteItem>
          <SiteLink to="/movies">
            <FontAwesomeIcon icon={faFilm} />{' '}
            <SiteText>{formatMessage(appMessages.movies)}</SiteText>
          </SiteLink>
        </SiteItem>
        <SiteItem>
          <SiteLink to="/tvs">
            <FontAwesomeIcon icon={faTv} />{' '}
            <SiteText>{formatMessage(appMessages.tvs)}</SiteText>
          </SiteLink>
        </SiteItem>
      </SiteList>
    </SiteNav>
  );
};
