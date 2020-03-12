import styled, { keyframes } from 'styled-components';
import { system, SystemProps, theme, ifProp } from '../../design-system';
import { ReactComponent as SpinnerIcon } from './spinner.svg';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dashoffset: 265;
  }
  50% {
    stroke-dashoffset: 66.25; /* 265 / 4 */
    transform:rotate(90deg);
  }
  100% {
    stroke-dashoffset: 265;
    transform:rotate(360deg);
  }
`;

export interface SpinnerProps extends SystemProps {
  inverted?: boolean;
}

export const Spinner = styled(SpinnerIcon)<SpinnerProps>`
  animation: ${rotate} 5s linear infinite;
  transform-origin: center;
  width: 100px;
  height: 100px;

  .path {
    stroke: ${ifProp(
      'inverted',
      theme(t => t.colors.primary.normal),
      theme(t => t.colors.secondary.normal)
    )};

    stroke-dasharray: 265;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: ${dash} 1s ease-in-out infinite;
  }

  ${system}
`;

export const SpinnerCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
