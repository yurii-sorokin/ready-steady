import { css } from 'styled-components';
import { theme } from './tools';

export interface SizeProps {
  w?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  h?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
}

export interface MarginProps {
  m?: string | number;
  mt?: string | number;
  mr?: string | number;
  mb?: string | number;
  ml?: string | number;
  mx?: string | number;
  my?: string | number;
}

export interface PaddingProps {
  p?: string | number;
  pt?: string | number;
  pr?: string | number;
  pb?: string | number;
  pl?: string | number;
  px?: string | number;
  py?: string | number;
}

export interface SystemProps extends SizeProps, MarginProps, PaddingProps {}

const space = (value?: string | number) =>
  value && theme(t => t.space[Number(value)] || value);

export const system = <P extends SystemProps>(p: P) => css<P>`
  width: ${p.width || p.w};
  min-width: ${p.minWidth};
  max-width: ${p.maxWidth};
  height: ${p.height || p.h};
  min-height: ${p.minHeight};
  max-height: ${p.maxHeight};
  margin: ${space(p.m)};
  margin-left: ${space(p.mx || p.ml)};
  margin-right: ${space(p.mx || p.mr)};
  margin-top: ${space(p.my || p.mt)};
  margin-bottom: ${space(p.my || p.mb)};
  padding: ${space(p.p)};
  padding-left: ${space(p.px || p.pl)};
  padding-right: ${space(p.px || p.pr)};
  padding-top: ${space(p.py || p.pt)};
  padding-bottom: ${space(p.py || p.pb)};
`;
