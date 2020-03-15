/* eslint-disable import/named */
import { ThemeProps } from 'styled-components';
import { Theme } from '../theme';

export const switchProp = <
  P extends ThemeProps<Theme>,
  RCase extends unknown,
  RDefault extends unknown
>(
  propName: keyof P,
  cases: { [key: string]: RCase },
  otherwise?: RDefault
) => (p: P) => cases[String(p[propName])] || otherwise;

export const whenProp = <
  P extends ThemeProps<Theme>,
  RLeft extends unknown,
  RRight extends unknown
>(
  fn: (p: P) => boolean,
  left: RLeft,
  right?: RRight
) => (p: P) => (fn(p) ? left : right);

export const ifProp = <
  P extends ThemeProps<Theme>,
  RLeft extends unknown,
  RRight extends unknown
>(
  propName: keyof P,
  left: RLeft,
  right?: RRight
) => (p: P) => (p[propName] ? left : right);

export const ifPropEq = <
  P extends ThemeProps<Theme>,
  RLeft extends unknown,
  RRight extends unknown
>(
  propName: keyof P,
  value: unknown,
  left: RLeft,
  right?: RRight
) => (p: P) => (p[propName] === value ? left : right);

export const ifNotProp = <
  P extends ThemeProps<Theme>,
  RLeft extends unknown,
  RRight extends unknown
>(
  propName: keyof P,
  left: RLeft,
  right?: RRight
) => (p: P) => (!p[propName] ? left : right);

export const theme = <P extends ThemeProps<Theme>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (theme: Theme) => any
) => (p: P) => fn(p.theme);
