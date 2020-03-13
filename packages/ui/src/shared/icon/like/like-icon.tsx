import { faHeart as faHeartOff } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef, memo } from 'react';
import styled from 'styled-components';
import { theme } from '../../../design-system';

export interface LikeIconProps {
  on?: boolean;
  onClick: () => void;
}

export const LikeIconUnstyled = memo(
  forwardRef(({ on, onClick, ...props }: LikeIconProps, ref: any) => (
    <span onClick={onClick} ref={ref}>
      <FontAwesomeIcon {...props} icon={on ? faHeartOn : faHeartOff} />
    </span>
  ))
);

export const LikeIcon = styled(LikeIconUnstyled)`
  fill: currentColor;
  color: ${theme(t => t.colors.status.danger)};
`;
