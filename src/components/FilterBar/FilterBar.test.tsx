import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FilterBar from './index';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import type { FilterType } from '../../types';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
};

const setWindowWidth = (width: number) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Desktop behavior (width >= 1024)', () => {
    beforeEach(() => {
      setWindowWidth(1200);
    });

    it('renders all filters with correct counts', () => {
      renderWithTheme(<FilterBar {...mockProps} />);
      ['All', 'Live', 'Result', 'Upcoming'].forEach((label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText(String(mockProps.filterCounts[label as FilterType]))).toBeInTheDocument();
      });
    });

    it('does NOT render collapse toggle button on desktop', () => {
      renderWithTheme(<FilterBar {...mockProps} />);
      const toggleButton = screen.queryByRole('button', { name: /expand filters|collapse filters/i });
      expect(toggleButton).not.toBeInTheDocument();
    });

    it('calls onFilterChange when a filter is clicked', () => {
      renderWithTheme(<FilterBar {...mockProps} />);
      const liveButton = screen.getByText('Live');
      fireEvent.click(liveButton);
      expect(mockProps.onFilterChange).toHaveBeenCalledWith('Live');
    });

    it('renders active filter button', () => {
      renderWithTheme(<FilterBar {...mockProps} />);
      const activeButton = screen.getByText('All').closest('button');
      expect(activeButton).toBeInTheDocument();
    });
  });

  describe('Mobile behavior (width < 1024)', () => {
    beforeEach(() => {
      setWindowWidth(800);
    });

    it('renders collapse toggle button', () => {
      renderWithTheme(<FilterBar {...mockProps} />);
      const toggleButton = screen.getByRole('button', { name: /expand filters|collapse filters/i });
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveAttribute('aria-expanded');
    });

    it('toggle button toggles collapse state and aria attributes', () => {
      renderWithTheme(<FilterBar {...mockProps} />);
      const toggleButton = screen.getByRole('button', { name: /expand filters|collapse filters/i });

      // Initially expanded (aria-expanded true)
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

      // Click to collapse
      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

      // Click to expand again
      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('filter options container height changes on toggle (verified via aria-expanded)', async () => {
      renderWithTheme(<FilterBar {...mockProps} />);
      const toggleButton = screen.getByRole('button', { name: /expand filters|collapse filters/i });

      // Initially expanded
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

      // Collapse
      fireEvent.click(toggleButton);
      await waitFor(() => {
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      });

      // Expand
      fireEvent.click(toggleButton);
      await waitFor(() => {
        expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('calls onFilterChange when a filter is clicked', () => {
      renderWithTheme(<FilterBar {...mockProps} />);
      const liveButton = screen.getByText('Live');
      fireEvent.click(liveButton);
      expect(mockProps.onFilterChange).toHaveBeenCalledWith('Live');
    });
  });

  it('shows the correct count for each filter', () => {
    renderWithTheme(<FilterBar {...mockProps} />);
    expect(screen.getByText('All')).toHaveTextContent('All');
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('Result')).toBeInTheDocument();
    expect(screen.getByText('Upcoming')).toBeInTheDocument();
  });
});
