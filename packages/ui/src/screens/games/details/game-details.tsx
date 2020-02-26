import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Markdown from 'markdown-to-jsx';
import React, { FC, useLayoutEffect, useRef } from 'react';
import { Game } from '../../../api/rawg/types';
import {
  CardDetails,
  CardDetailsFooter,
  CardDetailsPoster
} from '../../../shared/card/details';
import { Description } from '../../../shared/card/details/description';
import { Title } from '../../../shared/card/details/title';
import { Img } from '../../../shared/img';
import { Tag, TagList } from '../../../shared/tag-list';
import { PlatformList } from '../platform-list';
import { useGameDetails } from '../use-games';
import { SpinnerCenter, Spinner } from '../../../shared/spinner';

export const GameDetails: FC<{ game: Game }> = ({ game }) => {
  const { data: gameDetails, loading } = useGameDetails(game.id);
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
        gameDetails && (
          <>
            <CardDetailsPoster>
              {gameDetails.clip && gameDetails.clip.clips['640'] ? (
                <video controls loop muted width="100%">
                  <source
                    src={gameDetails.clip.clips['640']}
                    type="video/mp4"
                  />
                  <Img src={gameDetails.background_image} />
                </video>
              ) : (
                <Img src={gameDetails.background_image} />
              )}
            </CardDetailsPoster>
            <CardDetailsFooter>
              <PlatformList platforms={gameDetails.platforms} />
              <Title>{gameDetails.name}</Title>
              <TagList>
                {gameDetails.genres.map(({ name }) => (
                  <Tag key={name}>{name}</Tag>
                ))}
              </TagList>
              <Description>
                <Markdown>
                  {(gameDetails.description_raw || '')
                    .replace(/(\n+)?(●|\*)((\n|\s)+)?/g, '\n\n* ')
                    .replace(/\n+/g, '\n\n')}
                </Markdown>
              </Description>
            </CardDetailsFooter>
          </>
        )
      )}
    </CardDetails>
  );
};
