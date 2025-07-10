import styled from 'styled-components';
import { transition } from '../../styles/mixins';

export const ToggleButton = styled.button<{ $theme: any }>`
  background: ${({ $theme }) => $theme.cardBackground};
  color: ${({ $theme }) => $theme.textPrimary};
  border: 1px solid ${({ $theme }) => $theme.border};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ${transition('all 0.3s ease')};

  svg {
    display: block;
  }
`;
