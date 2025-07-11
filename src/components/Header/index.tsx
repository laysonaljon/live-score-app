'use client';

import React from 'react';
import ThemeToggle from '../ThemeToggle'; 
import { StyledHeader, AppTitle } from './styles';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <StyledHeader>
      <AppTitle>Live Score</AppTitle>
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </StyledHeader>
  );
};

export default Header;
