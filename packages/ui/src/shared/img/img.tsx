import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { system, SystemProps, theme } from '../../design-system';

const defaultSrc =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export const ImgUnstyled: FC<{ src?: string; fallbackSrc?: string }> = ({
  src,
  fallbackSrc,
  ...props
}) => {
  const [safeSrc, setSafeSrc] = useState<string | undefined>(
    src || fallbackSrc || defaultSrc
  );
  const onError = useCallback(() => setSafeSrc(fallbackSrc || defaultSrc), [
    fallbackSrc
  ]);

  return (
    <img
      {...{
        ...props,
        src: safeSrc,
        decoding: 'async',
        loading: 'lazy',
        alt: ' ',
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
