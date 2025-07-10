import styled, { css } from 'styled-components';
import { media } from '../../styles/mixins';

export const MatchCardContainer = styled.div`
  background: ${(props) => props.theme.cardBackground};
  border-radius: 16px;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${(props) => props.theme.border};

  ${media.tabletPortraitUp`
    padding: 1.5rem 1rem 1rem 1rem;
    margin-bottom: 1.5rem;
  `}
`;

export const TopInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const Country = styled.span`
  font-size: 0.9rem;
  font-weight: 100;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 0.2rem;
  letter-spacing: 0.05em;
`;

export const CompetitionName = styled.span`
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const MatchTimeDisplay = styled.span`
  font-size: 0.85rem;
  font-weight: 100;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
`;

export const StatusText = styled.span<{ $statusType: 'inprogress' | 'notstarted' | 'finished' | 'canceled' }>`
  font-size: 0.85rem;
  font-weight: 100;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.2rem;

  ${(props) => {
    switch (props.$statusType) {
      case 'inprogress':
        return css`color: ${props.theme.indicatorLive};`;
      case 'finished':
        return css`color: ${props.theme.liveProgress};`;
      case 'notstarted':
        return css`color: ${props.theme.textSecondary};`;
      case 'canceled':
        return css`color: ${props.theme.indicatorCancelled};`;
      default:
        return css`color: ${props.theme.textPrimary};`;
    }
  }}
`;

export const TeamRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const TeamName = styled.span`
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  flex: 1;
  opacity: 0.85;

  ${media.tabletPortraitUp`
    font-size: 1rem;
  `}
`;

export const Score = styled.span`
  font-size: 2.8rem;
  color: ${(props) => props.theme.scoreText};
  min-width: 100px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

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
        border: 0.5px solid ${props.theme.textSecondary};
        color: transparent;
        background: transparent;
      `;
    }

    return css`
      border: 0.5px solid ${props.theme.liveProgress};
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
  color: ${(props) => props.theme.textPrimary};
`;
