/* eslint-disable @typescript-eslint/camelcase */
import { tmdbApi } from '../api';
import { AppendVideos, Video } from '../types';

const imgUrl = (key: string) => `https://img.youtube.com/vi/${key}/0.jpg`;

export const ensureVideos = async <T extends AppendVideos>(item: T) => {
  const results = await Promise.all(
    item.videos.results.map(async item => {
      try {
        await tmdbApi(imgUrl(item.key));
        return item;
      } catch (error) {
        return null;
      }
    })
  );

  return {
    ...item,
    videos: {
      ...item.videos,
      results: results.filter(Boolean) as Video[]
    }
  };
};
