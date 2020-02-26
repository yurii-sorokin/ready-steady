import styled from 'styled-components';
import { box } from '../../design-system';
import React, { FC } from 'react';

export const YouTubeWrapper = styled.div`
  ${box}
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
`;

export const YouTubeFrame = styled.iframe.attrs({
  title: '',
  frameBorder: '0',
  allow: 'encrypted-media'
})`
  ${box}
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const videoUrl = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=0&mute=1`;

export const YouTube: FC<{ id: string; width?: string; height?: string }> = ({
  id,
  width,
  height
}) => (
  <YouTubeWrapper>
    <YouTubeFrame {...{ src: videoUrl(id), width, height }} />
  </YouTubeWrapper>
);
