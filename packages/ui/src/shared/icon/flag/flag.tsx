import React, { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const Icon = styled.div<{ src: string }>`
  ${p =>
    p.src &&
    css`
      background: url(${p.src});
    `}
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
  position: relative;
  display: inline-block;
  width: 16px;
  height: 12px;
`;

export const FlagIconUnstyled: FC<{ code: string }> = ({ code, ...props }) => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    import(`flag-icon-css/flags/4x3/${code}.svg`)
      .then(m => setUrl(m.default))
      .catch(console.error);
  }, [code]);

  return <Icon src={url} {...props}></Icon>;
};

export const FlagIcon = styled(FlagIconUnstyled)`
  display: inline-block;
  width: 17px;
  height: 14px;
`;
