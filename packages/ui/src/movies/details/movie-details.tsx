import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import React, { FC, useLayoutEffect, useRef } from 'react';
import { Movie } from '../../api/movies';
import {
  CardDetails,
  CardDetailsFooter,
  CardDetailsPoster
} from '../../shared/card/details';
import { Description } from '../../shared/card/details/description';
import { Title } from '../../shared/card/details/title';
import { Img } from '../../shared/img';
import { Tag, TagList } from '../../shared/tag-list';
import { YouTube } from '../../shared/youtube';
import { FlagList } from '../flag-list';
import { useMovieDetails } from '../use-movies';

export const MovieDetails: FC<{ movie: Movie }> = ({ movie }) => {
  const { data: item } = useMovieDetails(movie.id);
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
          <YouTube src={item.videos[0].embed} width="100%" />
        ) : (
          <Img src={item.backdrop_path} fallbackSrc={item.poster_path} />
        )}
      </CardDetailsPoster>
      <CardDetailsFooter>
        <FlagList countries={item.production_countries} />
        <Title>{item.title}</Title>
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
