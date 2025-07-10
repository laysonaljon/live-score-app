'use client';

import Head from 'next/head';
import styled from 'styled-components';
import { useMatches } from '../hooks/useMatches';
import FilterBar from '../components/FilterBar';
import MatchCard from '../components/MatchCard';
import { media, flexCenter } from '../styles/mixins';

const MainContainer = styled.div`
  ${flexCenter('column')}
  width: 100%;
  padding: 1rem;
  gap: 2rem;

  ${media.tabletPortraitUp`
    padding: 2rem;
  `}
`;

const MatchList = styled.div`
  display: grid;
  width: 100%;
  max-width: 1200px;
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
  color: ${(props) => props.theme.textPrimary};
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

  if (loading) return <Message>Loading matches...</Message>;
  if (error) return <Message>Error: {error}</Message>;

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

        {filteredMatches.length > 0 ? (
          <MatchList>
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </MatchList>
        ) : (
            <Message>No matches found for the selected filter.</Message>
        )}
      </MainContainer>
    </>
  );
};

export default Home;
