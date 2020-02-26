export interface Clip {
  clip: string;
  clips: Record<'320' | '640' | 'full', string>;
  video: string;
  preview: string;
}
