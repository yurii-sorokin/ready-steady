import useKey from '@rooks/use-key';
import transparentize from 'polished/lib/color/transparentize';
import React, { FC, MouseEvent, useCallback, useRef, memo } from 'react';
import { down, up } from 'styled-breakpoints';
import styled from 'styled-components';
import { box, Size, system, SystemProps, theme } from '../../design-system';

export const ModalDialog = styled.div<SystemProps>`
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
    height: auto;
    max-height: 80vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    border-radius: ${theme(t => t.radii.small)};
  }

  ${system}
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

export interface ModalProps extends SystemProps {
  onClose: () => void;
}

export const Modal: FC<ModalProps> = memo(({ children, onClose, ...props }) => {
  const modalRef = useRef<any>(null);
  const onClick = useCallback(
    (e: MouseEvent<any>) => {
      if (!modalRef.current || !modalRef.current.contains(e.target as any)) {
        onClose();
      }
    },
    [onClose]
  );
  useKey(['Escape'], onClose);

  return (
    <ModalOverlay onClick={onClick}>
      <ModalDialog ref={modalRef} {...props}>
        {children}
      </ModalDialog>
    </ModalOverlay>
  );
});
