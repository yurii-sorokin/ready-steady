/* eslint-disable @typescript-eslint/camelcase */
import { Network } from '../types';

export const imgUrl = (path?: string | null, size = 'original') =>
  path && `https://image.tmdb.org/t/p/${size}${path}`;

export const prefixPoster = <
  T extends { backdrop_path: string | null; poster_path: string | null }
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
