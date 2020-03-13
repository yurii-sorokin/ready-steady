import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import React, { FC, useLayoutEffect, useRef, memo } from 'react';
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
import { Subscription } from '../../../firebase/store';
import { SubscriptionIcon } from '../../../shared/card/subscription';

export interface MovieDetailsProps {
  movie: Movie;
  subscription?: Subscription;
  onClick?: () => void;
}

export const MovieDetails: FC<MovieDetailsProps> = memo(
  ({ movie, subscription, onClick }) => {
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
              <SubscriptionIcon
                on={!!subscription}
                type="movie"
                id={movie.id}
                title={movie.title}
                date={movie.release_date}
              />
              <CardDetailsPoster>
                {movieDetails.videos.results[0] ? (
                  <YouTube
                    id={movieDetails.videos.results[0].key}
                    width="100%"
                  />
                ) : (
                  <Img
                    onClick={onClick}
                    alt={movieDetails.title}
                    src={movieDetails.backdrop_path}
                    fallbackSrc={movieDetails.poster_path}
                  />
                )}
              </CardDetailsPoster>
              <CardDetailsFooter onClick={onClick}>
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
  }
);
