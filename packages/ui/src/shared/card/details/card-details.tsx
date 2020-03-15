import { down, up } from 'styled-breakpoints';
import styled from 'styled-components';
import { box, Size, theme } from '../../../design-system';
import { Img } from '../../img';
import { TagList } from '../../tag-list';
import { Description } from './description';
import { IconList } from './icon-list';
import { Title } from './title';
import { Box } from '../../box';

export const CardDetails = styled(Box)`
  ${box}
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  border: 1px solid;
  border-color: ${theme(t => t.colors.border.normal)};
  background-color: ${theme(t => t.colors.card.normal)};
  color: ${theme(t => t.colors.text.primary)};
  border-top-left-radius: ${theme(t => t.radii.normal)};
  border-top-right-radius: ${theme(t => t.radii.normal)};

  ${up(Size.md)} {
    height: auto;
    display: block;
    min-height: 400px;
    border-radius: ${theme(t => t.radii.small)};
  }

  ${down(Size.md, 'landscape')} {
    height: auto;
    display: block;
    min-height: 300px;
    border-radius: ${theme(t => t.radii.small)};
  }
`;

export const CardDetailsPoster = styled(Box)`
  ${box}
  width: 100%;

  ${Img} {
    max-height: 225px;
    width: 100%;

    ${down(Size.md, 'landscape')} {
      max-height: 200px;
    }
  }
`;

export const CardDetailsFooter = styled(Box)`
  ${box}
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid;
  border-color: ${theme(t => t.colors.border.normal)};
  overflow-y: auto;
  overflow-x: hidden;

  ${IconList} {
    margin-top: ${theme(t => t.space[2])};
  }

  ${Title}, ${IconList}, ${Description}, ${TagList} {
    padding-right: ${theme(t => t.space[2])};
    padding-left: ${theme(t => t.space[2])};
    margin-bottom: ${theme(t => t.space[2])};
  }
`;
