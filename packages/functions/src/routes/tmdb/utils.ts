/* eslint-disable @typescript-eslint/camelcase */
import { tmdbApi } from './api';
import { Movie, MovieDetails } from './movies.types';
import { ListResponse } from './response.types';
import { Tv, TvDetails, Network } from './tvs.types';

export const imgUrl = (path?: string, size = 'original') =>
  path && `https://image.tmdb.org/t/p/${size}${path}`;

export const prefixPoster = <
  T extends { backdrop_path: string; poster_path: string }
>(
  item: T
) => ({
  ...item,
  backdrop_path: imgUrl(item.backdrop_path),
  poster_path: imgUrl(item.poster_path, 'w500')
});

export const prefixNetworks = <T extends { networks: Network[] }>(item: T) => ({
  ...item,
  networks: item.networks.map(network => ({
    ...network,
    logo_path: imgUrl(network.logo_path, 'w92')
  }))
});

export const ensureVideos = async <T extends MovieDetails | TvDetails>(
  item: T
) =>
  (
    await Promise.all(
      item.videos.results.map(async item => {
        const imgUrl = (key: string) =>
          `https://img.youtube.com/vi/${key}/0.jpg`;
        const videoUrl = (key: string) =>
          `https://www.youtube.com/embed/${key}?autoplay=0&mute=1`;
        try {
          await tmdbApi(imgUrl(item.key));
          return { ...item, embed: videoUrl(item.key) };
        } catch (error) {
          return;
        }
      })
    )
  ).filter(Boolean) as T['videos']['results'];

export const paginate = async <T extends ListResponse<Movie | Tv>>(
  url: string,
  searchParams: object,
  data: T
) => {
  const totalPages = data.total_pages;
  let page = data.page;
  let results = data.results;
  let nextData = data;

  while (page < totalPages && page < 3) {
    nextData = await tmdbApi(url, {
      searchParams: { ...searchParams, page: page + 1 }
    }).json<T>();
    page = nextData.page;
    results = results.concat(nextData.results);
  }

  return results;
};
