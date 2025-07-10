'use client';

import React from 'react';
import { Match } from '../../types';
import {
  MatchCardContainer,
  TopInfo,
  Country,
  CompetitionName,
  StatusText,
  TeamRow,
  TeamName,
  Score,
  CentralCircle,
  LiveMinuteText,
  ScoreDivider,
} from './styles';
import { formatTimestamp, getStatusLabel } from '../../utils/formatters';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const { status, liveStatus, homeScore, awayScore, homeTeam, awayTeam, competition, country, timestamp } = match;

  const isInProgress = status.type === 'inprogress';
  const isFinished = status.type === 'finished';
  const isNotStarted = status.type === 'notstarted';
  const isCanceled = status.type === 'canceled';
  const isZeroScore = isNotStarted || isCanceled;

  const showCentralIndicator = isInProgress || isFinished || isZeroScore || liveStatus === 'HT';

  const liveMinute = isInProgress && !isNaN(Number(liveStatus)) ? parseInt(liveStatus) : 0;

  const renderCentralStatus = () => {
    if (isInProgress) {
      return <LiveMinuteText>{liveStatus === 'HT' ? 'HT' : `${liveStatus}'`}</LiveMinuteText>;
    }
    if (liveStatus === 'HT') return <LiveMinuteText>HT</LiveMinuteText>;
    if (isFinished) return <LiveMinuteText>FT</LiveMinuteText>;
    return null;
  };

  return (
    <MatchCardContainer>
      <TopInfo>
        <Country>{country.toUpperCase()}</Country>
        <CompetitionName>{competition}</CompetitionName>
        <StatusText $statusType={status.type}>
          {isNotStarted ? formatTimestamp(timestamp) : getStatusLabel(status.type)}
        </StatusText>
      </TopInfo>

      <Score>
        {isZeroScore ? '0' : homeScore?.current ?? '-'}
        <ScoreDivider>-</ScoreDivider>
        {isZeroScore ? '0' : awayScore?.current ?? '-'}
      </Score>

      <TeamRow>
        <TeamName>{homeTeam.name}</TeamName>

        {showCentralIndicator && (
          <CentralCircle
            $isLive={isInProgress}
            $isUpcoming={isZeroScore}
            $minute={liveMinute}
          >
            {renderCentralStatus()}
          </CentralCircle>
        )}

        <TeamName>{awayTeam.name}</TeamName>
      </TeamRow>
    </MatchCardContainer>
  );
};

export default MatchCard;
