export interface ListResponse<T extends unknown> {
  total_pages: number;
  page: number;
  results: T[];
}

export type DetailsResponse<T extends unknown> = T;
