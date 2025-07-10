'use client';

import Head from 'next/head';
import { memo, useMemo } from 'react';
import styled from 'styled-components';
import { useMatches } from '../hooks/useMatches';
import FilterBar from '../components/FilterBar';
import MatchCard from '../components/MatchCard';
import { media, flexCenter } from '../styles/mixins';

const MainContainer = styled.main`
  ${flexCenter('column')};
  width: 100%;
  gap: 2rem;
`;

const MatchList = styled.section`
  display: grid;
  width: 100%;
  gap: 1rem;
  grid-template-columns: 1fr;
  
  ${media.tabletLandscapeUp`
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  `}
  
  ${media.desktopUp`
    grid-template-columns: repeat(3, 1fr);
  `}
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textPrimary};
  text-align: center;
  margin-top: 2rem;
  ${flexCenter('column')}
`;

const Home: React.FC = () => {
  const {
    filteredMatches,
    filterCounts,
    activeFilter,
    handleFilterChange,
    loading,
    error,
  } = useMatches();

  const filterProps = useMemo(() => ({
    activeFilter,
    filterCounts,
    onFilterChange: handleFilterChange,
  }), [activeFilter, filterCounts, handleFilterChange]);

  const renderContent = () => {
    if (loading) return <Message>Loading matches...</Message>;
    if (error) return <Message>Error: {error}</Message>;
    if (filteredMatches.length === 0) return <Message>No matches found.</Message>;
    
    return (
      <MatchList>
        {filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </MatchList>
    );
  };

  return (
    <>
      <Head>
        <title>Live Score App</title>
        <meta name="description" content="Live football scores" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <MainContainer>
        <FilterBar {...filterProps} />
        {renderContent()}
      </MainContainer>
    </>
  );
};

export default memo(Home);