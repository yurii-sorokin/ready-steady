import { up } from 'styled-breakpoints';
import styled, { css } from 'styled-components';
import { box, Size, switchProp, theme } from '../../design-system';
import { Img } from '../img';
import { IconList } from './details/icon-list';

export const CardContent = styled.div`
  ${box}
  width: 100%;
`;

export const CardFooter = styled.div`
  ${box}
  width: 100%;
  padding: ${theme(t => t.space[1])};
  border-top: 1px solid;
  border-color: ${theme(t => t.colors.border.normal)};
  font-size: 0.75rem;
`;

export const CardTitle = styled.div`
  ${box}
  word-break: break-word;
  height: 3em;
  line-height: 1em;
`;

export const CardPoster = styled(Img)`
  ${box}
  width: 100%;
  height: 150px;
`;

export interface CardProps {
  index: number;
  size?: Size;
}

export const Card = styled.div.attrs(({ size }: CardProps) => ({
  'x-size': size
}))<CardProps>`
  ${box};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  border: 1px solid;
  border-color: ${theme(t => t.colors.border.normal)};
  border-radius: ${theme(t => t.radii.normal)};
  background-color: ${theme(t => t.colors.card.normal)};
  color: ${theme(t => t.colors.text.primary)};
  cursor: pointer;

  ${up(Size.lg)} {
    ${switchProp('size', {
      [Size.xs]: css`
        width: 60px;
        ${CardPoster} {
          height: 50px;
        }
        ${CardFooter} {
          font-size: 0rem;
          padding: ${theme(t => t.space[1])};
        }
        ${IconList} {
          display: none;
        }
      `,
      [Size.sm]: css`
        width: 100px;
        ${CardPoster} {
          height: 150px;
        }
        ${CardFooter} {
          font-size: 0.75rem;
        }
      `,
      [Size.md]: css`
        width: 210px;
        ${CardPoster} {
          height: 150px;
        }
        ${CardFooter} {
          font-size: 0.75rem;
        }
      `
    })}
  }
`;

export const EmptyCard = styled(Card)`
  width: 50px;
  height: 50px;
  flex: 1;
  opacity: 0;
`;
