import { rawgApi } from '../api';
import { SearchResult } from '../types';

export const paginate = async <T extends unknown>(data: SearchResult<T>) => {
  let results = data.results;
  let nextData = data;
  let page = 1;

  while (nextData.next && page < 3) {
    nextData = await rawgApi(nextData.next).json<SearchResult<T>>();
    results = [...results, ...nextData.results];
    page++;
  }

  return results;
};
