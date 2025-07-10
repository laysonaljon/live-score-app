import styled from 'styled-components';
import { flexCenter, transition, media, sizes } from '../../styles/mixins';

export const FilterWrapper = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.border};
  padding: 1.5rem;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;

  ${flexCenter('column')};
  align-items: flex-start;

  ${media.desktopUp`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  `}
`;

export const FilterHeader = styled.div`
  ${flexCenter('row')};
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  margin-bottom: 0.5rem;

  ${media.desktopUp`
    margin-bottom: 0;
    width: auto;
    margin-right: 1rem;
  `}
`;

export const FilterTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
  margin: 0;
`;

export const ToggleButton = styled.button<{ $isCollapsed: boolean }>`
  background: none;
  border: none;
  color: ${(props) => props.theme.textPrimary};
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 4px;
  ${flexCenter('row')};

  &:hover {
    color: ${(props) => props.theme.textSecondary};
  }

  ${media.desktopUp`
    display: none;
  `}
`;

export const FilterOptions = styled.div<{ $isCollapsed: boolean }>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-start;

  ${media.tabletPortraitUp`
    justify-content: space-between;
    gap: 1rem;
  `}

  @media (min-width: ${sizes.tabletPortraitWidth}px) and (max-width: ${sizes.desktopWidth - 1}px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
  }

  ${media.desktopUp`
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: space-between;
    gap: 1.5rem;
  `}
`;

export const FilterButton = styled.button<{ $isActive: boolean }>`
  ${flexCenter('row')};
  justify-content: center;
  background-color: ${(p) =>
    p.$isActive ? p.theme.filterActiveBg : 'transparent'};
  color: ${(p) =>
    p.$isActive ? p.theme.filterActiveText : p.theme.textPrimary};
  border: 1px solid
    ${(p) =>
      p.$isActive ? p.theme.filterActiveBg : p.theme.filterGray};
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  box-sizing: border-box;
  flex: 1 1 0;
  min-width: 140px;
  max-width: 100%;
  ${transition('background-color 0.3s ease, color 0.3s ease')};
  justify-content: space-between;

  &:hover {
    background-color: ${(p) =>
      p.$isActive ? p.theme.filterActiveBg : p.theme.filterHover};
    color: ${(p) =>
      p.$isActive ? p.theme.filterActiveText : p.theme.textPrimary};
    border-color: ${(p) =>
      p.$isActive ? p.theme.filterActiveBg : p.theme.filterHover};
  }

  ${media.phonePortraitOnly`
    flex-basis: 100%;
    min-width: auto;
  `}

  ${media.tabletPortraitUp`
    flex-basis: calc((100% - 3rem) / 2);
    min-width: auto;
  `}

  ${media.desktopUp`
    flex-basis: calc((100% - 3rem) / 5);
    min-width: auto;
  `}
`;

export const FilterCount = styled.span`
  background-color: ${(props) => props.theme.filterInactiveCountBg};
  color: ${(props) => props.theme.white};
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 25px;
  text-align: center;
  margin-left: 8px;
  user-select: none;
  border: 1px solid ${(props) => props.theme.border};

  ${media.phonePortraitOnly`
    font-size: 0.7rem;
    padding: 0.15rem 0.5rem;
    min-width: 20px;
  `}
`;
