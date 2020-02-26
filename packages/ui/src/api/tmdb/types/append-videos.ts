import { Videos } from './videos';

export type AppendVideos<T = {}> = T & { videos: Videos };
