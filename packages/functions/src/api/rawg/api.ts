import got from 'got';

export const rawgApi = got.extend({
  headers: {
    'User-Agent': 'ReadySteadyRelease/1.0'
  }
});
