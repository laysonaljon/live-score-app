'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FilterType } from '../../types';
import {
  FilterWrapper,
  FilterHeader,
  FilterTitle,
  ToggleButton,
  FilterOptions,
  FilterButton,
  FilterCount,
} from './styles';

const TABLET_BREAKPOINT = 1024;

interface FilterBarProps {
  activeFilter: FilterType;
  filterCounts: Record<FilterType, number>;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { label: FilterType; value: FilterType }[] = [
  { label: 'All', value: 'All' },
  { label: 'Result', value: 'Result' },
  { label: 'Live', value: 'Live' },
  { label: 'Upcoming', value: 'Upcoming' },
];

const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  filterCounts,
  onFilterChange,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= TABLET_BREAKPOINT);
  const filterOptionsRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>('auto');

  useEffect(() => {
    const onResize = () => {
      setIsDesktop(window.innerWidth >= TABLET_BREAKPOINT);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!filterOptionsRef.current) return;

    const el = filterOptionsRef.current;

    const onTransitionEnd = () => {
      if (!isCollapsed) setHeight('auto');
      el.removeEventListener('transitionend', onTransitionEnd);
    };

    el.addEventListener('transitionend', onTransitionEnd);

    if (isCollapsed) {
      const scrollHeight = el.scrollHeight;
      setHeight(scrollHeight);
      setTimeout(() => setHeight(0), 10);
    } else {
      setHeight(el.scrollHeight);
    }

    return () => el.removeEventListener('transitionend', onTransitionEnd);
  }, [isCollapsed]);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  const handleFilterClick = (filter: FilterType) => {
    onFilterChange(filter);
  };

  return (
    <FilterWrapper>
      <FilterHeader>
        <FilterTitle>Filters</FilterTitle>
        {!isDesktop && (
          <ToggleButton
            onClick={toggleCollapse}
            $isCollapsed={isCollapsed}
            aria-expanded={!isCollapsed}
            aria-label={isCollapsed ? 'Expand filters' : 'Collapse filters'}
            type="button"
          >
            {isCollapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-up"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            )}
          </ToggleButton>
        )}
      </FilterHeader>

      <FilterOptions
        ref={filterOptionsRef}
        style={{
          height: isDesktop ? 'auto' : height,
          overflow: isDesktop ? 'visible' : 'hidden',
          transition: 'height 0.35s ease',
        }}
        $isCollapsed={isCollapsed}
      >
        {filters.map(({ label, value }) => (
          <FilterButton
            key={value}
            $isActive={activeFilter === value}
            onClick={() => handleFilterClick(value)}
            type="button"
          >
            <span>{label}</span>
            <FilterCount>
              {filterCounts[value]}
            </FilterCount>
          </FilterButton>
        ))}
      </FilterOptions>
    </FilterWrapper>
  );
};

export default FilterBar;
