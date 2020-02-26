import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import React, { FC, useLayoutEffect, useRef } from 'react';
import { Movie } from '../../../api/tmdb/types';
import {
  CardDetails,
  CardDetailsFooter,
  CardDetailsPoster
} from '../../../shared/card/details';
import { Description } from '../../../shared/card/details/description';
import { Title } from '../../../shared/card/details/title';
import { Img } from '../../../shared/img';
import { Tag, TagList } from '../../../shared/tag-list';
import { YouTube } from '../../../shared/youtube';
import { FlagList } from '../flag-list';
import { useMovieDetails } from '../use-movies';
import { Spinner, SpinnerCenter } from '../../../shared/spinner';

export const MovieDetails: FC<{ movie: Movie }> = ({ movie }) => {
  const { data: movieDetails, loading } = useMovieDetails(movie.id);
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
        movieDetails && (
          <>
            <CardDetailsPoster>
              {movieDetails.videos.results[0] ? (
                <YouTube id={movieDetails.videos.results[0].key} width="100%" />
              ) : (
                <Img
                  src={movieDetails.backdrop_path}
                  fallbackSrc={movieDetails.poster_path}
                />
              )}
            </CardDetailsPoster>
            <CardDetailsFooter>
              <FlagList countries={movieDetails.production_countries} />
              <TagList>
                {movieDetails.genres.map(({ name }) => (
                  <Tag key={name}>{name}</Tag>
                ))}
              </TagList>
              <Title>{movieDetails.title}</Title>
              <Description>{movieDetails.overview}</Description>
            </CardDetailsFooter>
          </>
        )
      )}
    </CardDetails>
  );
};
