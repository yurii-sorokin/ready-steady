import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Markdown from 'markdown-to-jsx';
import React, { FC, memo, useLayoutEffect, useRef, MouseEvent } from 'react';
import { Game } from '../../../api/rawg/types';
import { Subscription } from '../../../firebase/store';
import {
  CardDetails,
  CardDetailsFooter,
  CardDetailsPoster
} from '../../../shared/card/details';
import { Description } from '../../../shared/card/details/description';
import { Title } from '../../../shared/card/details/title';
import { SubscriptionIcon } from '../../../shared/card/subscription';
import { Img } from '../../../shared/img';
import { Spinner, SpinnerCenter } from '../../../shared/spinner';
import { Tag, TagList } from '../../../shared/tag-list';
import { PlatformList } from '../platform-list';
import { useGameDetails } from '../use-games';
import { useIgnoreClick } from '../../../hooks/use-ignore-click';

export interface GameDetailsProps {
  game: Game;
  subscription?: Subscription;
  onClick?: (event?: MouseEvent<any>) => void;
}

export const GameDetails: FC<GameDetailsProps> = memo(
  ({ game, subscription, onClick }) => {
    const { data: gameDetails, loading } = useGameDetails(game.id);
    const cardRef = useRef<HTMLElement>();
    const iconRef = useRef<HTMLElement>();
    const onCardClick = useIgnoreClick(onClick, [iconRef]);

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
                    <Img
                      onClick={onCardClick}
                      alt={gameDetails.name}
                      src={gameDetails.background_image}
                    />
                  </video>
                ) : (
                  <Img
                    onClick={onCardClick}
                    alt={gameDetails.name}
                    src={gameDetails.background_image}
                  />
                )}
              </CardDetailsPoster>
              <CardDetailsFooter onClick={onCardClick}>
                <SubscriptionIcon
                  ref={iconRef}
                  on={!!subscription}
                  type="game"
                  id={game.id}
                  title={game.name}
                  date={game.released}
                />
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
  }
);
