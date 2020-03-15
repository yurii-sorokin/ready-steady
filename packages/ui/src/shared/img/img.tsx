import React, {
  FC,
  forwardRef,
  memo,
  MouseEvent,
  Ref,
  useCallback,
  useState
} from 'react';
import styled from 'styled-components';
import { system, SystemProps, theme } from '../../design-system';
import { Box } from '../box';

const defaultSrc =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export interface ImgProps {
  src?: string | null;
  alt: string;
  fallbackSrc?: string | null;
  onClick?: (event: MouseEvent<any>) => void;
}

export const ImgUnstyled: FC<ImgProps> = memo(
  forwardRef(({ src, fallbackSrc, alt, ...props }, ref: Ref<any>) => {
    const [safeSrc, setSafeSrc] = useState<string | undefined>(
      src || fallbackSrc || defaultSrc || undefined
    );
    const onError = useCallback(() => setSafeSrc(fallbackSrc || defaultSrc), [
      fallbackSrc
    ]);

    return (
      <Box
        as="img"
        ref={ref}
        {...{
          src: safeSrc,
          alt,
          decoding: 'async',
          loading: 'lazy',
          onError
        }}
        {...props}
      />
    );
  })
);

export const Img = styled(ImgUnstyled)<SystemProps>`
  display: block;
  object-fit: cover;
  background-color: ${theme(t => t.colors.primary.minor)};
  ${system};
`;
