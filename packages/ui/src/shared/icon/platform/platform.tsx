import React, { FC } from 'react';

import { ReactComponent as XboxIcon } from 'simple-icons/icons/xbox.svg';
import { ReactComponent as PlayStationIcon } from 'simple-icons/icons/playstation.svg';
import { ReactComponent as WindowsIcon } from 'simple-icons/icons/windows.svg';
import { ReactComponent as AppleIcon } from 'simple-icons/icons/apple.svg';
import { ReactComponent as NintendoSwitchIcon } from 'simple-icons/icons/nintendoswitch.svg';
import { ReactComponent as AndroidIcon } from 'simple-icons/icons/android.svg';
import { ReactComponent as LinuxIcon } from 'simple-icons/icons/linux.svg';
import { ReactComponent as WiiIcon } from 'simple-icons/icons/wii.svg';
import { ReactComponent as WiiUIcon } from 'simple-icons/icons/wiiu.svg';
import styled from 'styled-components';
import { box } from '../../../design-system';

export const PlatformIconUnstyled: FC<{ slug: string }> = ({
  slug,
  ...props
}) => (
  <div {...props}>
    {slug.includes('xbox') && <XboxIcon />}
    {slug.includes('playstation') && <PlayStationIcon />}
    {slug.includes('pc') && <WindowsIcon />}
    {slug.includes('mac') && <AppleIcon />}
    {slug.includes('nintendo-switch') && <NintendoSwitchIcon />}
    {slug.includes('android') && <AndroidIcon />}
    {slug.includes('linux') && <LinuxIcon />}
    {slug.includes('wii') && <WiiIcon />}
    {slug.includes('wii-u') && <WiiUIcon />}
  </div>
);

export const PlatformIcon = styled(PlatformIconUnstyled)`
  ${box}
  display: block;
  fill: currentColor;

  svg {
    width: 12px;
    height: 12px;
  }
`;
