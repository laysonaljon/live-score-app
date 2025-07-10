'use client';
import React, { useState } from 'react';
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
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

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

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <FilterWrapper>
      <FilterHeader>
        <FilterTitle>Filters</FilterTitle>
        <ToggleButton
          onClick={toggleCollapse}
          $isCollapsed={isCollapsed}
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? 'Expand filters' : 'Collapse filters'}
          type="button"
        >
          {isCollapsed ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
        </ToggleButton>
      </FilterHeader>
      <FilterOptions $isCollapsed={isCollapsed}>
        {filters.map(({ label, value }) => (
          <FilterButton
            key={value}
            $isActive={activeFilter === value}
            onClick={() => onFilterChange(value)}
            type="button"
          >
            <span>{label}</span>
            <FilterCount>{filterCounts[value]}</FilterCount>
          </FilterButton>
        ))}
      </FilterOptions>
    </FilterWrapper>
  );
};

export default FilterBar;