import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Markdown from 'markdown-to-jsx';
import React, { FC, useLayoutEffect, useRef } from 'react';
import { Game } from '../../api/games';
import {
  CardDetails,
  CardDetailsFooter,
  CardDetailsPoster
} from '../../shared/card/details';
import { Description } from '../../shared/card/details/description';
import { Title } from '../../shared/card/details/title';
import { Img } from '../../shared/img';
import { Tag, TagList } from '../../shared/tag-list';
import { PlatformList } from '../platform-list';
import { useGameDetails } from '../use-games';

export const GameDetails: FC<{ game: Game }> = ({ game }) => {
  const { data: item } = useGameDetails(game.id);
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
        {item.clip && item.clip.clips['640'] ? (
          <video controls loop muted width="100%">
            <source src={item.clip.clips['640']} type="video/mp4" />
            <Img width="100%" src={item.background_image} />
          </video>
        ) : (
          <Img width="100%" src={item.background_image} />
        )}
      </CardDetailsPoster>
      <CardDetailsFooter>
        <PlatformList platforms={item.platforms} />
        <Title>{item.name}</Title>
        <TagList>
          {item.genres.map(({ name }) => (
            <Tag key={name}>{name}</Tag>
          ))}
        </TagList>
        <Description>
          <Markdown>
            {(item.description_raw || '')
              .replace(/(\n+)?(●|\*)((\n|\s)+)?/g, '\n\n* ')
              .replace(/\n+/g, '\n\n')}
          </Markdown>
        </Description>
      </CardDetailsFooter>
    </CardDetails>
  );
};
