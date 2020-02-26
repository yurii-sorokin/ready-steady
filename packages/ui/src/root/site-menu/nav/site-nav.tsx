import styled from 'styled-components';
import { box, resetList, theme, Size } from '../../../design-system';
import { up } from 'styled-breakpoints';
import { NavLink } from 'react-router-dom';

export const SiteNav = styled.nav`
  ${box}
  font-size: 1rem;
  flex: 1;
  order: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme(t => t.space[1])} ${theme(t => t.space[2])};

  ${up(Size.sm)} {
    flex: 0;
    order: 2;
  }
`;

export const SiteList = styled.ul`
  ${box}
  ${resetList}
  display: flex;
  justify-content: center;
  margin-left: -${theme(t => t.space[2])};
  margin-right: -${theme(t => t.space[2])};
`;

export const SiteItem = styled.li`
  ${box}
  padding-left: ${theme(t => t.space[2])};
  padding-right: ${theme(t => t.space[2])};
`;

export const SiteLink = styled(NavLink)`
  ${box}
  display: inline-block;
  text-align: center;
  border: 1px solid;
  border-color: transparent;
  text-decoration: none;
  cursor: pointer;
  color: ${theme(t => t.colors.text.disabled)};

  &.active {
    cursor: default;
    color: ${theme(t => t.colors.text.primary)};
  }
`;

export const SiteText = styled.span`
  display: none;
  white-space: nowrap;
  line-height: 1.5em;

  ${up(Size.md)} {
    display: inline;
  }
`;
