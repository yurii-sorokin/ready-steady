import styled, { css } from 'styled-components';
import { theme, box, switchProp, resetButton, Size } from '../../design-system';
import React, { ReactNode } from 'react';

import { Spinner } from '../spinner';
import { up, down } from 'styled-breakpoints';

export const Form = styled.form`
  ${box}
  display: flex;
  flex-direction: column;
  border: 1px solid;
  border-color: ${theme(t => t.colors.border.normal)};
  border-top-left-radius: ${theme(t => t.radii.normal)};
  border-top-right-radius: ${theme(t => t.radii.normal)};
  background-color: ${theme(t => t.colors.card.normal)};
  color: ${theme(t => t.colors.card.inverted)};
  overflow-y: auto;
  height: 100%;

  ${up(Size.md)} {
    border-radius: ${theme(t => t.radii.small)};
  }

  ${down(Size.md, 'landscape')} {
    border-radius: ${theme(t => t.radii.small)};
  }
`;

export const FormHeader = styled.div`
  ${box}
  padding: ${theme(t => t.space[2])};
  margin-bottom: ${theme(t => t.space[2])};
  border-bottom: 1px solid;
  border-color: ${theme(t => t.colors.border.normal)};
`;

export const FormContent = styled.div`
  ${box}
  flex: 1;
  padding: ${theme(t => t.space[2])};
`;

export const FormFooter = styled.div`
  ${box}
  padding: ${theme(t => t.space[2])};
`;

export interface InputTextProps {
  status?: 'error';
}

export const InputText = styled.input<InputTextProps>`
  ${box}
  display: inline-block;
  width: 100%;
  appearance: none;
  outline: none;
  border-radius: ${theme(t => t.radii.small)};
  border: 1px solid;
  border-color: ${theme(t => t.colors.border.normal)};
  color: ${theme(t => t.colors.card.inverted)};
  background-color: ${theme(t => t.colors.card.normal)};
  padding: 10px 15px 11px;
  margin-bottom: ${theme(t => t.space[2])};

  ${switchProp(
    'status',
    {
      error: css`
        border-color: ${theme(t => t.colors.status.danger)};
      `
    },
    css`
      &:active,
      &:focus {
        border-color: ${theme(t => t.colors.secondary.normal)};
      }
    `
  )}
`;

export const Separator = styled.div`
  margin-top: ${theme(t => t.space[1])};
  margin-bottom: ${theme(t => t.space[1])};
  text-align: center;
`;

export const Info = styled.div`
  margin-top: ${theme(t => t.space[4])};
  text-align: center;
`;

export interface ButtonProps {
  pending?: boolean;
  children: ReactNode;
}

export const Button = styled.button.attrs(
  ({ children, pending }: ButtonProps) => ({
    children: pending ? (
      <Spinner width="16px" height="16px" inverted />
    ) : (
      children
    )
  })
)<ButtonProps>`
  ${box}
  ${resetButton}
  display: inline-block;
  width: 100%;
  text-align: center;
  border: 1px solid;
  border-color: ${theme(t => t.colors.border.normal)};
  border-radius: ${theme(t => t.radii.small)};
  color: ${theme(t => t.colors.text.secondary)};
  background: ${theme(t => t.colors.secondary.normal)};
  padding: 8px 10px 7px;
  min-height: 40px;
`;

export const Label = styled.label`
  display: block;
`;

export const LabelText = styled.div`
  display: flex;
  align-items: center;
  color: ${theme(t => t.colors.text.primary)};
  margin-bottom: ${theme(t => t.space[1])};
`;

export const InputError = styled.div`
  ${box}
  margin-left: auto;
  border-radius: ${theme(t => t.radii.small)};
  color: ${theme(t => t.colors.status.danger)};
  font-size: 0.8em;
  line-height: 1;
`;
