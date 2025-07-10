import { useState, useEffect, useMemo, useCallback } from 'react';
import { Match, FilterType } from '../types';
import { fetchMatches } from '../services/api';

const STATUS_FILTERS: Record<FilterType, string | null> = {
  All: null,
  Result: 'finished',
  Live: 'inprogress',
  Upcoming: 'notstarted',
};

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMatches();
        setMatches(data);
      } catch (err) {
        setError('Failed to load matches.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadMatches();
  }, []);

  const filteredMatches = useMemo(() => {
    const filterStatus = STATUS_FILTERS[activeFilter];
    return filterStatus ? matches.filter(m => m.status.type === filterStatus) : matches;
  }, [matches, activeFilter]);

  const filterCounts = useMemo(() => {
    const counts = matches.reduce((acc, match) => {
      const status = match.status.type;
      if (status === 'finished') acc.Result++;
      else if (status === 'inprogress') acc.Live++;
      else if (status === 'notstarted') acc.Upcoming++;
      return acc;
    }, { All: matches.length, Result: 0, Live: 0, Upcoming: 0 });
    
    return counts;
  }, [matches]);

  const handleFilterChange = useCallback((filter: FilterType) => {
    setActiveFilter(filter);
  }, []);

  return {
    filteredMatches,
    filterCounts,
    activeFilter,
    handleFilterChange,
    loading,
    error,
  };
};