import React, { FC, useRef, useLayoutEffect } from 'react';
import { Img } from '../../../shared/img';
import { Tag, TagList } from '../../../shared/tag-list';
import { Description } from '../../../shared/card/details/description';
import { YouTube } from '../../../shared/youtube';
import { NetworkList } from '../network-list';
import { useTvDetails } from '../use-tvs';
import {
  CardDetails,
  CardDetailsPoster,
  CardDetailsFooter
} from '../../../shared/card/details';
import { Title } from '../../../shared/card/details/title';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { TvShow } from '../../../api/tmdb/types';
import { SpinnerCenter, Spinner } from '../../../shared/spinner';

export const TvDetails: FC<{ tv: TvShow }> = ({ tv }) => {
  const { data: tvDetails, loading } = useTvDetails(tv.id);
  const cardRef = useRef<HTMLElement>();

  useLayoutEffect(() => {
    const node = cardRef.current;
    node && disableBodyScroll(node);
    return () => node && enableBodyScroll(node);
  });

  return (
    <CardDetails ref={cardRef as never}>
      {loading ? (
        <SpinnerCenter>
          <Spinner />
        </SpinnerCenter>
      ) : (
        tvDetails && (
          <>
            <CardDetailsPoster>
              {tvDetails.videos.results[0] ? (
                <YouTube id={tvDetails.videos.results[0].key} />
              ) : (
                <Img
                  src={tvDetails.backdrop_path}
                  fallbackSrc={tvDetails.poster_path}
                />
              )}
            </CardDetailsPoster>
            <CardDetailsFooter>
              <NetworkList networks={tvDetails.networks} />
              <TagList>
                {tvDetails.genres.map(({ name }) => (
                  <Tag key={name}>{name}</Tag>
                ))}
              </TagList>
              <Title>{tvDetails.name}</Title>
              <Description>{tvDetails.overview}</Description>
            </CardDetailsFooter>
          </>
        )
      )}
    </CardDetails>
  );
};
