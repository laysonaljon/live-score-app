import styled from 'styled-components';
import { flexCenter, transition } from '../../styles/mixins';

export const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textPrimary};
  padding: 0.25rem;
  border-radius: 4px;
  ${flexCenter('row')};
  ${transition('color 0.3s ease')};

  &:hover {
    color: ${({ theme }) => theme.textSecondary};
  }
`;
