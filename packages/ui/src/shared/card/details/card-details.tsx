import { up, down } from 'styled-breakpoints';
import styled from 'styled-components';
import { box, Size, theme } from '../../../design-system';
import { Img } from '../../img';
import { TagList } from '../../tag-list';
import { Description } from './description';
import { IconList } from './icon-list';
import { Title } from './title';

export const CardDetails = styled.div`
  ${box}
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow-y: auto;
  border: 1px solid;
  border-color: ${theme(t => t.colors.border.normal)};
  background-color: ${theme(t => t.colors.card.normal)};
  color: ${theme(t => t.colors.text.primary)};
  border-top-left-radius: ${theme(t => t.radii.normal)};
  border-top-right-radius: ${theme(t => t.radii.normal)};

  ${up(Size.md)} {
    display: block;
    border-radius: ${theme(t => t.radii.small)};
  }

  ${down(Size.md, 'landscape')} {
    display: block;
    border-radius: ${theme(t => t.radii.small)};
  }
`;

export const CardDetailsPoster = styled.div`
  ${box}
  width: 100%;

  ${Img} {
    max-height: 250px;
    width: 100%;

    ${down(Size.md, 'landscape')} {
      max-height: 200px;
    }
  }
`;

export const CardDetailsFooter = styled.div`
  ${box}
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
