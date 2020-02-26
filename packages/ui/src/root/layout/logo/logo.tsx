import styled from 'styled-components';
import { theme } from '../../../design-system';

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.65rem;
  padding: 2px;
  border: 1px solid;
  width: max-content;
  max-width: 43px;
  border-color: ${theme(t => t.colors.text.primary)};

  span::first-letter {
    font-weight: bold;
  }
`;
