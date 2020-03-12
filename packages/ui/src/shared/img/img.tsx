import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { system, SystemProps, theme } from '../../design-system';

const defaultSrc =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export interface ImgProps {
  src?: string | null;
  alt: string;
  fallbackSrc?: string | null;
  onClick?: () => void;
}

export const ImgUnstyled: FC<ImgProps> = ({
  src,
  fallbackSrc,
  alt,
  ...props
}) => {
  const [safeSrc, setSafeSrc] = useState<string | undefined>(
    src || fallbackSrc || defaultSrc || undefined
  );
  const onError = useCallback(() => setSafeSrc(fallbackSrc || defaultSrc), [
    fallbackSrc
  ]);

  return (
    <img
      {...{
        ...props,
        src: safeSrc,
        alt,
        decoding: 'async',
        loading: 'lazy',
        onError
      }}
    />
  );
};

export const Img = styled(ImgUnstyled)<SystemProps>`
  display: block;
  object-fit: cover;
  background-color: ${theme(t => t.colors.primary.minor)};
  ${system};
`;
