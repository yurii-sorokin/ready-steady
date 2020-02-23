import ky from 'ky';

export interface ApiResponse<T extends any> {
  readonly data: T;
}

export const getApi = () => {
  return <T extends any>(path: string, data?: any): Promise<ApiResponse<T>> =>
    ky.post(path, { json: data }).json();
};
