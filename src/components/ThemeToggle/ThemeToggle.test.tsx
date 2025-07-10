import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ThemeToggle from './index';
import { lightTheme, Theme } from '../../styles/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme as Theme}>{ui}</ThemeProvider>);
};

describe('ThemeToggle', () => {
  it('renders sun icon when isDarkMode is true', () => {
    renderWithTheme(<ThemeToggle isDarkMode={true} toggleTheme={jest.fn()} />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    const circle = button.querySelector('circle');
    expect(circle).toBeInTheDocument();
  });

  it('renders moon icon when isDarkMode is false', () => {
    renderWithTheme(<ThemeToggle isDarkMode={false} toggleTheme={jest.fn()} />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    const path = button.querySelector('path');
    expect(path).toHaveAttribute('d', expect.stringContaining('M12 3a6 6'));
  });

  it('calls toggleTheme when button is clicked', () => {
    const toggleThemeMock = jest.fn();
    renderWithTheme(<ThemeToggle isDarkMode={false} toggleTheme={toggleThemeMock} />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(button);
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
