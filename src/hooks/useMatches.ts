import { useState, useEffect, useMemo } from 'react';
import { Match, FilterType } from '../types';
import { fetchMatches } from '../services/api';

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMatches = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMatches();
        setMatches(data);
        setFilteredMatches(data);
      } catch (err) {
        setError('Failed to load matches.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getMatches();
  }, []);

  // Memoize filter counts to avoid recalculating on every render
  const filterCounts = useMemo(() => {
    const counts = {
      All: matches.length,
      Result: matches.filter((match) => match.status.type === 'finished').length,
      Live: matches.filter((match) => match.status.type === 'inprogress').length,
      Upcoming: matches.filter((match) => match.status.type === 'notstarted').length,
    };
    return counts;
  }, [matches]);

  useEffect(() => {
    let currentFilteredMatches: Match[] = [];
    switch (activeFilter) {
      case 'All':
        currentFilteredMatches = matches;
        break;
      case 'Result':
        currentFilteredMatches = matches.filter((match) => match.status.type === 'finished');
        break;
      case 'Live':
        currentFilteredMatches = matches.filter((match) => match.status.type === 'inprogress');
        break;
      case 'Upcoming':
        currentFilteredMatches = matches.filter((match) => match.status.type === 'notstarted');
        break;
      default:
        currentFilteredMatches = matches;
    }
    setFilteredMatches(currentFilteredMatches);
  }, [activeFilter, matches]);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  return {
    filteredMatches,
    filterCounts,
    activeFilter,
    handleFilterChange,
    loading,
    error,
  };
};
