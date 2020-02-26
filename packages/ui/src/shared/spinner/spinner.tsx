import styled, { keyframes } from 'styled-components';
import adjustHue from 'polished/lib/color/adjustHue';
import { system, SystemProps, theme } from '../../design-system';
import { ReactComponent as SpinnerIcon } from './spinner.svg';

const rotator = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
`;

const colors = (p: any) => keyframes`
  0% { stroke: ${theme(t => adjustHue(0, t.colors.secondary.normal))(p)}; }
  25% { stroke: ${theme(t => adjustHue(-20, t.colors.secondary.normal))(p)}; }
  50% { stroke: ${theme(t => adjustHue(-40, t.colors.secondary.normal))(p)}; }
  75% { stroke: ${theme(t => adjustHue(-20, t.colors.secondary.normal))(p)}; }
  100% { stroke: ${theme(t => adjustHue(-10, t.colors.secondary.normal))(p)}; }
`;

const dash = keyframes`
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 187/4;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
`;

export const Spinner = styled(SpinnerIcon)<SystemProps>`
  animation: ${rotator} 1.4s linear infinite;
  width: 100px;
  height: 100px;

  .path {
    stroke: ${theme(t => t.colors.secondary.normal)};

    stroke-dasharray: 187;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: ${dash} 1.4s ease-in-out infinite,
      ${colors} 6.6s ease-in-out infinite;
  }

  ${system}
`;

export const SpinnerCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
