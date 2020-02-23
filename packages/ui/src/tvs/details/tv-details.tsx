import React, { FC, useRef, useLayoutEffect } from 'react';
import { Img } from '../../shared/img';
import { Tag, TagList } from '../../shared/tag-list';
import { Description } from '../../shared/card/details/description';
import { YouTube } from '../../shared/youtube';
import { NetworkList } from '../network-list';
import { useTvDetails } from '../use-tvs';
import {
  CardDetails,
  CardDetailsPoster,
  CardDetailsFooter
} from '../../shared/card/details';
import { Title } from '../../shared/card/details/title';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Tv } from '../../api/tvs';

export const TvDetails: FC<{ tv: Tv }> = ({ tv }) => {
  const { data: item } = useTvDetails(tv.id);
  const cardRef = useRef<HTMLElement>();

  useLayoutEffect(() => {
    const node = cardRef.current;
    node && disableBodyScroll(node);
    return () => node && enableBodyScroll(node);
  });

  if (!item) {
    return null;
  }

  return (
    <CardDetails ref={cardRef as never}>
      <CardDetailsPoster>
        {item.videos[0] ? (
          <YouTube src={item.videos[0].embed} />
        ) : (
          <Img src={item.backdrop_path} fallbackSrc={item.poster_path} />
        )}
      </CardDetailsPoster>
      <CardDetailsFooter>
        <NetworkList networks={item.networks} />
        <Title>{item.name}</Title>
        <Description>{item.overview}</Description>
        <TagList>
          {item.genres.map(({ name }) => (
            <Tag key={name}>{name}</Tag>
          ))}
        </TagList>
      </CardDetailsFooter>
    </CardDetails>
  );
};
