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
} from './styles';
import { useTheme } from 'styled-components';
import { Theme } from '../../styles/theme';
import { formatTimestamp, getStatusLabel } from '../../utils/formatters';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const theme = useTheme() as Theme;

const renderCentralStatus = () => {
  if (match.status.type === 'inprogress') {
    return <LiveMinuteText>{match.liveStatus === 'HT' ? 'HT' : `${match.liveStatus}'`}</LiveMinuteText>;
  }
  if (match.liveStatus === 'HT') {
    return <LiveMinuteText>HT</LiveMinuteText>;
  }
  if (match.status.type === 'finished') {
    return <LiveMinuteText>FT</LiveMinuteText>;
  }
  return null;
};

  const showCentralIndicator =
    ['inprogress', 'finished', 'notstarted', 'canceled'].includes(match.status.type) || match.liveStatus === 'HT';

  const isZeroScore = ['notstarted', 'canceled'].includes(match.status.type);

  const liveMinute = match.status.type === 'inprogress' && !isNaN(parseInt(match.liveStatus))
    ? parseInt(match.liveStatus)
    : 0;

  return (
    <MatchCardContainer>
      <TopInfo>
        <Country>{match.country.toUpperCase()}</Country>
        <CompetitionName>{match.competition}</CompetitionName>
        {match.status.type === 'notstarted' ? (
          <StatusText $statusType={match.status.type}>
            {formatTimestamp(match.timestamp)}
          </StatusText>
        ) : (
          <StatusText $statusType={match.status.type}>
            {getStatusLabel(match.status.type)}
          </StatusText>
        )}
      </TopInfo>

    
        
        <Score>
          {isZeroScore ? '0' : (match.homeScore?.current ?? '-')}
          <span style={{ color: theme.textPrimary, margin: '0 12px', fontWeight: 400 }}>-</span>
          {isZeroScore ? '0' : (match.awayScore?.current ?? '-')}
        </Score>

        <TeamRow>
          <TeamName>{match.homeTeam.name}</TeamName>
          {showCentralIndicator && (
            <CentralCircle
                $isLive={match.status.type === 'inprogress'}
          $isUpcoming={isZeroScore}
          $minute={liveMinute}
        >
          {renderCentralStatus()}
        </CentralCircle>
      )}
      <TeamName>{match.awayTeam.name}</TeamName>
            </TeamRow>
    </MatchCardContainer>
  );
};

export default MatchCard;