import React, { FC, useRef, useLayoutEffect, memo } from 'react';
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
import { Subscription } from '../../../firebase/store';
import { SubscriptionIcon } from '../../../shared/card/subscription';

export interface TvDetailsProps {
  tv: TvShow;
  subscription?: Subscription;
  onClick?: () => void;
}

export const TvDetails: FC<TvDetailsProps> = memo(
  ({ tv, subscription, onClick }) => {
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
              <SubscriptionIcon
                on={!!subscription}
                type="tv"
                id={tv.id}
                title={tv.name}
                date={tv.first_air_date}
              />
              <CardDetailsPoster>
                {tvDetails.videos.results[0] ? (
                  <YouTube id={tvDetails.videos.results[0].key} />
                ) : (
                  <Img
                    onClick={onClick}
                    src={tvDetails.backdrop_path}
                    alt={tvDetails.name}
                    fallbackSrc={tvDetails.poster_path}
                  />
                )}
              </CardDetailsPoster>
              <CardDetailsFooter onClick={onClick}>
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
  }
);
