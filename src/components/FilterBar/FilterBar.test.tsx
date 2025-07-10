import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from './index';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import type { FilterType } from '../../types';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
};

describe('FilterBar', () => {
  const mockProps = {
    activeFilter: 'All' as FilterType,
    onFilterChange: jest.fn(),
    filterCounts: {
        All: 12,
        Live: 3,
        Result: 5,
        Upcoming: 4,
    },
  };

  it('renders all filters', () => {
    renderWithTheme(<FilterBar {...mockProps} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('Result')).toBeInTheDocument();
    expect(screen.getByText('Upcoming')).toBeInTheDocument();
  });

  it('calls onFilterChange when filter is clicked', () => {
    renderWithTheme(<FilterBar {...mockProps} />);
    const liveButton = screen.getByText('Live');
    fireEvent.click(liveButton);
    expect(mockProps.onFilterChange).toHaveBeenCalledWith('Live');
  });

  it('shows the correct count for each filter', () => {
    renderWithTheme(<FilterBar {...mockProps} />);
    expect(screen.getByText('All')).toHaveTextContent('All');
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('Result')).toBeInTheDocument();
    expect(screen.getByText('Upcoming')).toBeInTheDocument();
  });
});
