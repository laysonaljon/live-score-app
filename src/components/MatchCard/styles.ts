import styled, { css } from 'styled-components';
import { media } from '../../styles/mixins';

export const MatchCardContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  padding: 2rem 1.5rem 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.border};

  ${media.tabletPortraitUp`
    padding: 1.5rem 1rem 1rem;
  `}
`;

export const TopInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Country = styled.span`
  font-size: 0.9rem;
  font-weight: 100;
  color: ${({ theme }) => theme.textSecondary};
  letter-spacing: 0.05em;

  ${media.phonePortraitOnly`
    font-size: 0.75rem;
  `}
`;

export const CompetitionName = styled.span`
  font-size: 1.2rem;
  text-align: center;
  color: ${({ theme }) => theme.textPrimary};

  ${media.phonePortraitOnly`
    font-size: 1.2rem;
  `}
`;

export const MatchTimeDisplay = styled.span`
  font-size: 0.85rem;
  font-weight: 100;
  color: ${({ theme }) => theme.textSecondary};
  letter-spacing: 0.05em;

  ${media.phonePortraitOnly`
    font-size: 0.7rem;
  `}
`;

export const StatusText = styled.span<{
  $statusType: 'inprogress' | 'notstarted' | 'finished' | 'canceled';
}>`
  font-size: 0.85rem;
  font-weight: 100;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;

  ${media.phonePortraitOnly`
    font-size: 0.7rem;
  `}

  ${({ $statusType, theme }) => {
    switch ($statusType) {
      case 'inprogress':
        return css`color: ${theme.indicatorLive};`;
      case 'finished':
        return css`color: ${theme.liveProgress};`;
      case 'notstarted':
        return css`color: ${theme.textSecondary};`;
      case 'canceled':
        return css`color: ${theme.indicatorCancelled};`;
      default:
        return css`color: ${theme.textPrimary};`;
    }
  }}
`;

export const TeamRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const TeamName = styled.span`
  flex: 1;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textPrimary};
  opacity: 0.85;

  ${media.tabletPortraitUp`
    font-size: 1rem;
  `}

  ${media.phonePortraitOnly`
    font-size: 0.9rem;
  `}
`;

export const Score = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.8rem;
  color: ${({ theme }) => theme.scoreText};
  text-align: center;
  min-width: 100px;

  ${media.tabletPortraitUp`
    font-size: 2.2rem;
  `}
`;

export const CentralCircle = styled.div<{ $isLive: boolean; $isUpcoming?: boolean; $minute?: number }>`
  margin-top: 0.5rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  box-sizing: border-box;
  position: relative;

  ${(props) => {
    if (props.$isLive) {
      const minute = props.$minute ?? 0;
      const progress = Math.min(minute / 90, 1);
      const degrees = progress * 360;

      return css`
        border: none;
        background: conic-gradient(
          ${props.theme.liveProgress} ${degrees}deg,
          ${props.theme.textSecondary} ${degrees}deg
        );

        &::before {
          content: '';
          position: absolute;
          top: 1px;
          left: 1px;
          right: 1px;
          bottom: 1px;
          border-radius: 50%;
          background: ${props.theme.cardBackground};
          z-index: 1;
        }

        & > * {
          position: relative;
          z-index: 2;
        }
      `;
    }

    if (props.$isUpcoming) {
      return css`
        border: 1px solid ${props.theme.textSecondary};
        color: transparent;
        background: transparent;
      `;
    }

    return css`
      border: 1px solid ${props.theme.liveProgress};
      color: ${props.theme.liveProgress};
      background: transparent;
    `;
  }}

  ${media.tabletPortraitUp`
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  `}
`;

export const LiveMinuteText = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textPrimary};

  ${media.phonePortraitOnly`
    font-size: 1rem;
  `}
`;

export const ScoreDivider = styled.span`
  margin: 0 12px;
  color: ${({ theme }) => theme.textPrimary};
  font-weight: 400;

  ${media.phonePortraitOnly`
    margin: 0 8px;
    font-size: 1.5rem;
  `}
`;
