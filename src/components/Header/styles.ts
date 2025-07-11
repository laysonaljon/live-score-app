import styled from 'styled-components';
import { media } from '../../styles/mixins';

export const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  ${media.phonePortraitOnly`
    gap: 1rem;
  `}
`;

export const AppTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};

  ${media.phonePortraitOnly`
    font-size: 2rem;
  `}
`;
