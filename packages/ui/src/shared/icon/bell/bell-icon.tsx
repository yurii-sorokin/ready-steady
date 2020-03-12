import { faBell as faBellOff } from '@fortawesome/free-regular-svg-icons';
import { faBell as faBellOn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef } from 'react';
import styled from 'styled-components';

export interface BellIconProps {
  on?: boolean;
  onClick: () => void;
}

export const BellIconUnstyled = forwardRef(
  ({ on, onClick, ...props }: BellIconProps, ref: any) => (
    <span onClick={onClick} ref={ref}>
      <FontAwesomeIcon {...props} icon={on ? faBellOn : faBellOff} />
    </span>
  )
);

export const BellIcon = styled(BellIconUnstyled)``;
