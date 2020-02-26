import styled from 'styled-components';
import { box, theme } from '../../design-system';
import rgba from 'polished/lib/color/rgba';

export const Bg = styled.div<{ src?: string | null }>`
  ${box};
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  z-index: -1;
  background: linear-gradient(
      180deg,
      ${theme(t => rgba(t.colors.card.inverted, 0))} 0%,
      ${theme(t => rgba(t.colors.card.inverted, 0.7))} 100%
    ),
    url(${p => p.src}) center center no-repeat fixed;
  background-size: cover;
  filter: blur(0.3rem);
  transform: scale(1.1);
`;
