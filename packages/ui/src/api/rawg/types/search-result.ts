export interface SearchResult<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
  user_platforms: boolean;
}
