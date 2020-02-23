import { css } from 'styled-components';

export interface SystemProps {
  width?: string;
  height?: string;
  m?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  mx?: string;
  my?: string;
  p?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  px?: string;
  py?: string;
}

export const system = <P extends SystemProps>(p: P) => css`
  width: ${p.width};
  height: ${p.height};
  margin: ${p.m};
  margin-left: ${p.mx || p.ml};
  margin-right: ${p.mx || p.mr};
  margin-top: ${p.my || p.mt};
  margin-bottom: ${p.my || p.mb};
  padding: ${p.p};
  padding-left: ${p.px || p.pl};
  padding-right: ${p.px || p.pr};
  padding-top: ${p.py || p.pt};
  padding-bottom: ${p.py || p.pb};
`;
