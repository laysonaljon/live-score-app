import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './index';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';

jest.mock('../ThemeToggle', () => {
  return ({ toggleTheme }: { toggleTheme: () => void }) => (
    <button onClick={toggleTheme}>Toggle Theme</button>
  );
});

describe('Header', () => {
  const mockToggleTheme = jest.fn();

  const renderHeader = (isDarkMode: boolean = false) =>
    render(
      <ThemeProvider theme={lightTheme}>
        <Header isDarkMode={isDarkMode} toggleTheme={mockToggleTheme} />
      </ThemeProvider>
    );

  it('renders the title', () => {
    renderHeader();
    expect(screen.getByText('Live Score')).toBeInTheDocument();
  });

  it('renders the theme toggle button', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });

  it('calls toggleTheme when toggle button is clicked', () => {
    renderHeader();
    fireEvent.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
