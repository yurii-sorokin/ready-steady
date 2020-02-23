import transparentize from 'polished/lib/color/transparentize';
import { up, down } from 'styled-breakpoints';
import styled from 'styled-components';
import { box, Size, theme } from '../../design-system';

export const Modal = styled.div`
  ${box}
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70vh;
  padding-left: ${theme(t => t.space[1])};
  padding-right: ${theme(t => t.space[1])};
  z-index: 100;

  ${down(Size.sm, 'landscape')} {
    bottom: unset;
    width: 70vw;
    height: 95vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0;
    border-radius: ${theme(t => t.radii.small)};
  }

  ${up(Size.md)} {
    bottom: unset;
    width: 500px;
    max-height: 80vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    border-radius: ${theme(t => t.radii.small)};
  }
`;

export const ModalOverlay = styled.div`
  ${box}
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: ${theme(t => transparentize(0.1, t.colors.card.normal))};
`;
