/* eslint-disable @typescript-eslint/camelcase */
import { tmdbApi } from '../api';
import { SearchResult } from '../types';

export const paginate = async <T extends unknown>(
  url: string,
  searchParams: object,
  data: SearchResult<T>
) => {
  const totalPages = data.total_pages;
  let page = data.page;
  let results = data.results;
  let nextData = data;

  while (page < totalPages && page < 3) {
    nextData = await tmdbApi(url, {
      searchParams: { ...searchParams, page: page + 1 }
    }).json<SearchResult<T>>();
    page = nextData.page;
    results = results.concat(nextData.results);
  }

  return results;
};
