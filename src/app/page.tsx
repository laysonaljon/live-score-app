'use client';

import Head from 'next/head';
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

  let content;

  if (loading) {
    content = <Message>Loading matches...</Message>;
  } else if (error) {
    content = <Message>Error: {error}</Message>;
  } else if (filteredMatches.length === 0) {
    content = <Message>No matches found for the selected filter.</Message>;
  } else {
    content = (
      <MatchList>
        {filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </MatchList>
    );
  }

  return (
    <>
      <Head>
        <title>Live Score App</title>
        <meta name="description" content="Live football scores" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainContainer>
        <FilterBar
          activeFilter={activeFilter}
          filterCounts={filterCounts}
          onFilterChange={handleFilterChange}
        />
        {content}
      </MainContainer>
    </>
  );
};

export default Home;
